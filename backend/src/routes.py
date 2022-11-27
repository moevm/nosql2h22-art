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
