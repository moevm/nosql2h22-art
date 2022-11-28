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
DELETE FROM ArtWorks
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
    res = db.execute("""SELECT DISTINCT(museumname) FROM ArtWorks""")
    museums_list = []
    for i in res:
        museums_list.append(dict(i)['museumname'])
    return museums_list


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

    return data


def reimport_arts():
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

def get_arts_by_filter():
    requestJson = request.get_json()

    titleFilter = requestJson['title']
    authorFilter = requestJson['author']
    startYearFilter = requestJson['startYear']
    endYearFilter = requestJson['endYear']
    museumFilter = requestJson['museum']
    genreFilter = requestJson['genre']
    materialFilter = requestJson['material']
    res = []

    titleFilter = '%' + titleFilter + '%'
 
    authorFilter = '%' + authorFilter + '%'

    if ((startYearFilter != '') & (endYearFilter != '')):
        startYearFilter = startYearFilter + '-01-01'
        endYearFilter = endYearFilter + '-12-31'
    elif ((startYearFilter == '') & (endYearFilter != '')):
        startYearFilter = '0001-01-01' 
        endYearFilter = endYearFilter + '-12-31'
    elif ((startYearFilter != '') & (endYearFilter == '')):
        startYearFilter = startYearFilter + '-01-01'
        endYearFilter = '9999-12-31'
    elif ((startYearFilter == '') & (endYearFilter == '')):
        startYearFilter = '0001-01-01'
        endYearFilter = '9999-12-31'

    res = db.execute(

        """
            SELECT * FROM ArtWorks
            WHERE
                name_ LIKE %s
                AND author_ LIKE %s
                AND start_year_ > %s
                AND end_year_ < %s
                AND museum_name = %s
                AND genre_name = %s
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
