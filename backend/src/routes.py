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
    startYear INT,
    endYear INT,
    materials varchar(200),
    type varchar(100),
    museumName varchar(200),
    museumAddress varchar(200),
    genre varchar(100),
    URL varchar(10000)
);
"""

ADD_PICTURE = """
    INSERT INTO ArtWorks (name, author, 
                          description, startYear, 
                          endYear, materials, 
                          type,  museumName, 
                          museumAddress, genre, URL)
    VALUES (%s, %s, %s, %s, 
            %s, %s, %s, %s, 
            %s, %s, %s)
    RETURNING artworkid;
"""


def clear_tmp():
    db.execute(DELETE_ALL_NOTES)
    cache.clear()
    return "It's me, Flask"


def add_art():
    data = request.get_json()
    # adding into postgres

    key = db.execute(ADD_PICTURE, (data['name'], data['author'],
                                   data['description'], data['startYear'],
                                   data['endYear'], data['materials'],
                                   data['type'], data['museumName'],
                                   data['museumAddress'], data['genre'],
                                   data['URL']))

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
                                       data['description'], data['startYear'],
                                       data['endYear'], data['materials'],
                                       data['type'], data['museumName'],
                                       data['museumAddress'], data['genre'],
                                       data['URL']))
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


def recreate_table(): # it's not used but it useful when you need to change table configuration (e.g. fields)
    db.execute(DROP_TABLE)
    db.execute(CREATE_TABLE)
    cache.clear()
