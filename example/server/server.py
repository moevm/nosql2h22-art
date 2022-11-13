import os

# Connect to a PostgreSQL database and execute queries in Python using the Psycopg2 library.
import psycopg2

# Python-dotenv reads pairs key-value from  .env file, and it can set them as environment variables.
from dotenv import load_dotenv
from flask import Flask, request
import json
# memcache
import time
from pymemcache.client import base
from unidecode import unidecode

submitted_form = {
    "name": 'Возьми мое сердце',
    "author": 'Богданов Степан Семёнович',
    "description": "В своём стремлении повысить качество жизни, они забывают, "
                   "что реализация намеченных плановых заданий, а также свежий взгляд "
                   "на привычные вещи — безусловно открывает новые горизонты для дальнейших направлений "
                   "развития. Противоположная точка зрения подразумевает, что предприниматели в сети интернет "
                   "представляют "
                   "собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть рассмотрены исключительно "
                   "в разрезе маркетинговых и финансовых предпосылок. Лишь тщательные исследования конкурентов набирают "
                   "популярность "
                   "среди определенных слоев населения, а значит, должны быть указаны как претенденты на роль ключевых "
                   "факторов. "
                   "Ясность нашей позиции очевидна: высокое качество позиционных исследований позволяет выполнить важные "
                   "задания по разработке "
                   "приоретизации разума над эмоциями.",
    "start_year": '2016-10-11',
    "end_year": '2016-12-11',
    "materials": 'Краски',
    "type_name": 'Картина',
    "museum_name": 'Great Secrets Museum',
    "museum_address": '109 Community College Rd Ahoskie NC 27910-9522 USA',
    "genre_name": 'Портрет',
    "url": 'https://www.imgonline.com.ua/examples/bee-on-daisy.jpg'
}

submitted_form_json = json.dumps(submitted_form, ensure_ascii=False)
print("JSON: {}".format(submitted_form_json))  # JSON

# Parse json
jsonDict = json.dumps(submitted_form_json, ensure_ascii=False)
print("Dict: {}".format(jsonDict))

# create client instance for memcached
client = base.Client(('localhost', 11211))  # by default memcached works at 11211 port

# setting a value
client.set("1", unidecode(submitted_form_json))
print(client.get("1"))

# takes .env file and reads different variables in there and puts them into the enviroment variables of this process
load_dotenv()

app = Flask(__name__)
# variable url will get value DATABASE_URL from .env
url = os.getenv("DATABASE_URL")
# connect to our DB by url
#
connection = psycopg2.connect(host='localhost', user="postgres", password="1111", dbname="postgres")

INSERT_VALS = """
    INSERT INTO Main.ArtWork(name_, author_, description, start_year_, end_year_, materials,
                         type_name,  museum_name, museum_address, genre_name, URL)
    VALUES  ('Возьми мое сердце', 'Богданов Степан Семёнович', 'В своём стремлении повысить качество жизни, они забывают, что реализация намеченных плановых заданий, а также свежий взгляд на привычные вещи — безусловно открывает новые горизонты для дальнейших направлений развития. Противоположная точка зрения подразумевает, что предприниматели в сети интернет представляют собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Лишь тщательные исследования конкурентов набирают популярность среди определенных слоев населения, а значит, должны быть указаны как претенденты на роль ключевых факторов. Ясность нашей позиции очевидна: высокое качество позиционных исследований позволяет выполнить важные задания по разработке приоретизации разума над эмоциями.', '2016-10-11', '2016-12-11', 'Краски',
        'Скульптура', 'Great Secrets Museum', '109 Community College Rd Ahoskie NC 27910-9522 USA', 'Портрет', 'https://www.imgonline.com.ua/examples/bee-on-daisy.jpg');
    """

DELETE_VALS = """
    DELETE  FROM Main.artwork
    WHERE Main.artwork.name_ = 'Возьми мое сердце';
"""


@app.get("/")
def home():
    return "It's server"


@app.get("/insert")
def insert():  # insert into Postgres-db
    cursor = connection.cursor()
    cursor.execute(INSERT_VALS)
    connection.commit()
    cursor.close()
    return "Successfully inserted"


@app.get("/delete")
def delete():  # delete from postgres db
    cursor = connection.cursor()
    cursor.execute(DELETE_VALS)
    connection.commit()
    cursor.close()
    return "Successfully deleted"


app.run()
