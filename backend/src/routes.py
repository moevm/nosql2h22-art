import json

from cachelib import MemcachedCache
from flask import request
from sqlalchemy import create_engine
from analysis import *

db_name = 'testdb'
db_user = 'postgres'
db_pass = '1111'
db_host = 'database'
db_port = '5432'

# Connecto to the database
db_string = 'postgresql://{}:{}@{}:{}/{}'.format(db_user, db_pass, db_host, db_port, db_name)
db = create_engine(db_string)

cache = MemcachedCache(['memcached:11211'])

DELETE_ALL_NOTES = """
DELETE FROM ArtWorks *;
"""

DROP_TABLE = """
DROP TABLE IF EXISTS ArtWorks;
"""

CREATE_TABLE = """
CREATE TABLE IF NOT EXISTS ArtWorks (
    artworkid SERIAL PRIMARY KEY,
    name varchar(200),
    author varchar(200),
    description varchar(10000),
    start_year INT,
    end_year INT,
    materials varchar(200),
    type varchar(100),
    museum_name varchar(200),
    genre varchar(100),
    url varchar(10000)
);
"""

ADD_PICTURE = """
    INSERT INTO ArtWorks (name, author,
                          description, start_year,
                          end_year, materials,
                          type,  museum_name, 
                          genre, url)
    VALUES (%s, %s, %s, %s,
            %s, %s, %s, %s,
            %s, %s)
    RETURNING artworkid;
"""


def clear_tmp():
    db.execute(DELETE_ALL_NOTES)
    cache.clear()
    return "It's me, Flask"


def get_materials():
    res = db.execute("""SELECT DISTINCT(materials) FROM ArtWorks""")
    materials_list = []
    for i in res:
        materials_list.append(dict(i)['materials'])
    return materials_list


def get_genres():
    res = db.execute("""SELECT DISTINCT(genre) FROM ArtWorks""")
    genres_list = []
    for i in res:
        genres_list.append(dict(i)['genre'])
    return genres_list


def get_museums():
    res = db.execute("""SELECT DISTINCT(museum_name) FROM ArtWorks""")
    museums_list = []
    for i in res:
        museums_list.append(dict(i)['museum_name'])
    return museums_list


def get_types():
    res = db.execute("""SELECT DISTINCT(type) FROM ArtWorks""")
    museums_list = []
    for i in res:
        museums_list.append(dict(i)['type'])
    return museums_list


def add_art():
    data = request.get_json()
    # adding into postgres

    key = db.execute(ADD_PICTURE, (data['name'], data['author'],
                                   data['description'], data['start_year'],
                                   data['end_year'], data['materials'],
                                   data['type'], data['museum_name'],
                                   data['genre'], data['url']))

    res = db.execute("""SELECT * FROM ArtWorks""")

    # adding into memcached
    key = str(key.all()[0][0])
    cache.set(key, data)

    return data


def reimport_arts():
    print('reimport_arts')
    db.execute(DELETE_ALL_NOTES)
    cache.clear()
    json = request.get_json()
    for data in json:
        key = db.execute(ADD_PICTURE, (data['name'], data['author'],
                                       data['description'], data['start_year'],
                                       data['end_year'], data['materials'],
                                       data['type'], data['museum_name'],
                                       data['genre'], data['url']))
        key = str(key.all()[0][0])
        cache.set(key, data)
        print("Value is written into memcached by key: {}".format(key))
        print(cache.get(key))
    return ''


def build_update_query(id: str, update: json):
    query = "UPDATE ArtWorks SET "
    params = []

    if 'name' in update:
        print(f"New name {update['name']}")
        query += 'name = %s,'
        params.append(update['name'])

    if 'url' in update:
        print(f"New url {update['url']}")
        query += 'url = %s,'
        params.append(update['url'])

    if 'description' in update:
        print(f"New description {update['description']}")
        query += 'description = %s,'
        params.append(update['description'])

    if 'author' in update:
        print(f"New author {update['author']}")
        query += 'author = %s,'
        params.append(update['author'])

    if 'museum_name' in update:
        print(f"New museum_name {update['museum_name']}")
        query += 'museum_name = %s,'
        params.append(update['museum_name'])

    if 'genre' in update:
        print(f"New genre {update['genre']}")
        query += 'genre = %s,'
        params.append(update['genre'])

    if 'materials' in update:
        print(f"New materials {update['materials']}")
        query += 'materials = %s,'
        params.append(update['materials'])

    if 'type' in update:
        print(f"New type {update['type']}")
        query += 'type = %s,'
        params.append(update['type'])

    if 'start_year' in update:
        print(f"New start_year {update['start_year']}")
        query += 'start_year = %s,'
        params.append(int(update['start_year']))

    if 'end_year' in update:
        print(f"New end_year {update['end_year']}")
        query += 'end_year = %s '
        params.append(int(update['end_year']))

    if not len(params):
        raise ValueError('Update request cannot be empty')

    query = query[:-1] + ' '
    query += "WHERE artworkid = %s RETURNING *"
    params.append(int(id))

    print(f"Query: {query}")
    print(f"Params: {params}")

    return query, params


def update_art(id):
    update = request.get_json()

    print(f'update_art {id}, request: {update}')

    if id is None:
        raise ValueError("Art work id cannot be empty")

    query, params = build_update_query(id, update)
    new_artwork = db.execute(query, *params).first()

    if not new_artwork:
        raise ValueError(f"Art work with id {id} not found")

    new_artwork = dict(new_artwork)

    print(f"Updated: {new_artwork}")

    cache.set(id, new_artwork)

    return new_artwork


def get_arts():
    res = db.execute("""SELECT * FROM ArtWorks""")
    json = []
    for i in res:
        json.append(dict(i))
    return json


def is_number_correct(requested_number):
    if not requested_number:
        return False
    try:
        return int(requested_number) > 0
    except ValueError:
        return False


def string_or_any(requested_string):
    if not requested_string:
        return "%%"
    return requested_string


def get_arts_by_filter():
    requestJson = request.get_json()
    print("by filter: ", requestJson)
    titleFilter = string_or_any(requestJson['title'])
    authorFilter = string_or_any(requestJson['author'])
    museumFilter = string_or_any(requestJson['museum_name'])
    genreFilter = string_or_any(requestJson['genre'])
    materialFilter = string_or_any(requestJson['material'])
    typeFilter = string_or_any(requestJson['type'])

    titleFilter = '%' + titleFilter + '%'
    authorFilter = '%' + authorFilter + '%'

    startYearFilter = requestJson['start_year'] if is_number_correct(requestJson['start_year']) else -1
    endYearFilter = requestJson['end_year'] if is_number_correct(requestJson['end_year']) else 3000

    res = db.execute(
        """
            SELECT * FROM ArtWorks
            WHERE
                name LIKE %s
                AND author LIKE %s
                AND start_year >= %s
                AND end_year <= %s
                AND museum_name LIKE %s
                AND genre LIKE %s
                AND materials LIKE %s
                AND type LIKE %s
        """,
        (
            titleFilter,
            authorFilter,
            startYearFilter,
            endYearFilter,
            museumFilter,
            genreFilter,
            materialFilter,
            typeFilter
        )
    )

    json = []
    for i in res:
        json.append(dict(i))
    return json


def recreate_table():  # it's not used but it useful when you need to change table configuration (e.g. fields)
    db.execute(DROP_TABLE)
    db.execute(CREATE_TABLE)
    cache.clear()
    return ''


def get_analysis_museums():
    first_seven_count = db.execute("""SELECT DISTINCT museum_name, COUNT(museum_name) AS items_count
                        FROM ArtWorks
                        GROUP BY museum_name
                        ORDER BY items_count DESC
                        LIMIT 7;""")

    other_count = db.execute("""SELECT COUNT(*) FROM ArtWorks""")
    return draw_diagram_get_png(first_seven_count, other_count, field='museum_name')


def get_analysis_start_years():
    first_seven_count = db.execute("""SELECT DISTINCT start_year, COUNT(start_year) AS items_count
                        FROM ArtWorks
                        GROUP BY start_year
                        ORDER BY items_count DESC
                        LIMIT 7;""")

    other_count = db.execute("""SELECT COUNT(*) FROM ArtWorks""")
    return draw_diagram_get_png(first_seven_count, other_count, field='start_year')


def get_analysis_end_years():
    first_seven_count = db.execute("""SELECT DISTINCT end_year, COUNT(end_year) AS items_count
                        FROM ArtWorks
                        GROUP BY end_year
                        ORDER BY items_count DESC
                        LIMIT 7;""")

    other_count = db.execute("""SELECT COUNT(*) FROM ArtWorks""")
    return draw_diagram_get_png(first_seven_count, other_count, field='end_year')


def get_analysis_materials():
    first_seven_count = db.execute("""SELECT DISTINCT materials, COUNT(materials) AS items_count
                        FROM ArtWorks
                        GROUP BY materials
                        ORDER BY items_count DESC
                        LIMIT 7;""")

    other_count = db.execute("""SELECT COUNT(*) FROM ArtWorks""")
    return draw_diagram_get_png(first_seven_count, other_count, field='materials')


def get_analysis_types():
    first_seven_count = db.execute("""SELECT DISTINCT type, COUNT(type) AS items_count
                        FROM ArtWorks
                        GROUP BY type
                        ORDER BY items_count DESC
                        LIMIT 7;""")

    other_count = db.execute("""SELECT COUNT(*) FROM ArtWorks""")
    return draw_diagram_get_png(first_seven_count, other_count, field='type')


def get_analysis_authors():
    first_seven_count = db.execute("""SELECT DISTINCT author, COUNT(author) AS items_count
                        FROM ArtWorks
                        GROUP BY author
                        ORDER BY items_count DESC
                        LIMIT 7;""")

    other_count = db.execute("""SELECT COUNT(*) FROM ArtWorks""")
    return draw_diagram_get_png(first_seven_count, other_count, field='author')


def get_analysis_genres():
    first_seven_count = db.execute("""SELECT DISTINCT genre, COUNT(genre) AS items_count
                        FROM ArtWorks
                        GROUP BY genre
                        ORDER BY items_count DESC
                        LIMIT 7;""")

    other_count = db.execute("""SELECT COUNT(*) FROM ArtWorks""")
    return draw_diagram_get_png(first_seven_count, other_count, field='genre')
