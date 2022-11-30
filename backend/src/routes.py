from cachelib import MemcachedCache
from flask import request
from sqlalchemy import create_engine

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
    for i in res:
        print(i)

    # adding into memcached
    key = str(key.all()[0][0])
    cache.set(key, data)

    print('added')

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