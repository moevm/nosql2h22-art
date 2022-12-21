from typing import Any

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


def queryParamsAppend(updateJson: json, queryString: str, keys: list):
    last_item: str = keys[-1]
    print("Last item: ", last_item)
    params = []
    for key in keys:
        if key in updateJson:
            print(f"New {key} {updateJson[key]}")
            if key == last_item:
                queryString = queryString + key + ' = %s '
            else:
                queryString = queryString + key + ' = %s,'
            params.append(updateJson[key])
    return [queryString, params]


def build_update_query(id: str, update: json):
    print(update)
    keys = ['name', 'url', 'description', 'author', 'museum_name', 'genre', 'materials', 'type', 'start_year', 'end_year']
    res = queryParamsAppend(update, "UPDATE ArtWorks SET ", keys)
    query = res[0]
    params = res[1]

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


def get_analysis(field: str):
    fields_list = ['museum_name', 'start_year', 'end_year',
                   'materials', 'type', 'author', 'genre']
    if field not in fields_list:
        response = make_response('No such field')
        return response
    first_seven_count = db.execute(f"""SELECT DISTINCT {field}, COUNT({field}) AS items_count
                        FROM ArtWorks
                        GROUP BY {field}
                        ORDER BY items_count DESC
                        LIMIT 7;""")

    other_count = db.execute("""SELECT COUNT(*) FROM ArtWorks""")
    return draw_diagram_get_png(first_seven_count, other_count, field=field)


def get_string_or_all(string:str):
    if string == "" or string == "Не выбрано":
        return "%%"
    return string

def get_analysis_by_filter(field: str):
    fields_list = ['museum_name', 'start_year', 'end_year',
                   'materials', 'type', 'author', 'genre', 'name']
    if field not in fields_list:
        response = make_response('No such field')
        return response

    requestJson = request.get_json()
    print(requestJson)
    titleFilter = get_string_or_all(requestJson["name"])
    authorFilter = get_string_or_all(requestJson["author"])
    museumFilter = get_string_or_all(requestJson["museum_name"])
    genreFilter = get_string_or_all(requestJson["genre"])
    materialFilter = get_string_or_all(requestJson["materials"])
    startYearFilter = requestJson['start_year'] if is_number_correct(requestJson['start_year']) else -1
    endYearFilter = requestJson['end_year'] if is_number_correct(requestJson['end_year']) else 3000
    typeFilter = get_string_or_all(requestJson['type'])

    print(titleFilter, authorFilter, museumFilter, genreFilter, materialFilter, startYearFilter, endYearFilter, typeFilter)

    first_seven_count = db.execute(f"""SELECT DISTINCT {field}, COUNT({field}) AS items_count
                            FROM (SELECT * FROM ArtWorks
                                                    WHERE
                                                    name LIKE %s
                                                    AND author LIKE %s
                                                    AND start_year >= %s
                                                    AND end_year <= %s
                                                    AND museum_name LIKE %s
                                                    AND genre LIKE %s
                                                    AND materials LIKE %s
                                                    AND type LIKE %s) AS SUB
                            GROUP BY {field}
                            ORDER BY items_count DESC
                            LIMIT 7;""",
                               (
                                   titleFilter,
                                   authorFilter,
                                   startYearFilter,
                                   endYearFilter,
                                   museumFilter,
                                   genreFilter,
                                   materialFilter,
                                   typeFilter
                               ))

    other_count = db.execute("""SELECT COUNT(*) FROM (SELECT * FROM ArtWorks
                                                    WHERE
                                                    name LIKE %s
                                                    AND author LIKE %s
                                                    AND start_year >= %s
                                                    AND end_year <= %s
                                                    AND museum_name LIKE %s
                                                    AND genre LIKE %s
                                                    AND materials LIKE %s
                                                    AND type LIKE %s) AS SUB""",
                                                    (
                                                        titleFilter,
                                                        authorFilter,
                                                        startYearFilter,
                                                        endYearFilter,
                                                        museumFilter,
                                                        genreFilter,
                                                        materialFilter,
                                                        typeFilter
                                                    ))
    return draw_diagram_get_png(first_seven_count=first_seven_count, other_count=other_count, field=field)

