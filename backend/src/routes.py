from flask import request
from cachelib import MemcachedCache

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
    museum_address varchar(200),
    genre varchar(100),
    url varchar(10000)
);
"""

ADD_PICTURE = """
    INSERT INTO ArtWorks (name, author, 
                          description, start_year, 
                          end_year, materials, 
                          type,  museum_name, 
                          museum_address, genre, url)
    VALUES (%s, %s, %s, %s, 
            %s, %s, %s, %s, 
            %s, %s, %s)
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


def add_art():
    data = request.get_json()
    # adding into postgres

    key = db.execute(ADD_PICTURE, (data['name'], data['author'],
                                   data['description'], data['start_year'],
                                   data['end_year'], data['materials'],
                                   data['type'], data['museum_name'],
                                   data['museum_address'], data['genre'],
                                   data['url']))

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
                                       data['museum_address'], data['genre'],
                                       data['url']))
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

def get_arts_by_filter():
    requestJson = request.get_json()

    titleFilter = requestJson['title']
    authorFilter = requestJson['author']
    startYearFilter = requestJson['start_year']
    endYearFilter = requestJson['end_year']
    museumFilter = requestJson['museum_name']
    genreFilter = requestJson['genre']
    materialFilter = requestJson['material']
    res = []

    titleFilter = '%' + titleFilter + '%'
 
    authorFilter = '%' + authorFilter + '%'

    if ((startYearFilter == '') & (endYearFilter != '')):
        startYearFilter = '0001'
    elif ((startYearFilter != '') & (endYearFilter == '')):
        endYearFilter = '9999'
    elif ((startYearFilter == '') & (endYearFilter == '')):
        startYearFilter = '0001'
        endYearFilter = '9999'

    res = db.execute(

        """
            SELECT * FROM ArtWorks
            WHERE
                name LIKE %s
                AND author LIKE %s
                AND start_year > %s
                AND end_year < %s
                AND museum_name = %s
                AND genre = %s
                AND materials = %s
        """,
        (
            titleFilter,
            authorFilter,
            startYearFilter,
            endYearFilter,
            museumFilter,
            genreFilter,
            materialFilter
        )
        )
    
    json = []
    for i in res:
        json.append(dict(i))
    return json

def recreate_table(): # it's not used but it useful when you need to change table configuration (e.g. fields)
    db.execute(DROP_TABLE)
    db.execute(CREATE_TABLE)
    cache.clear()
