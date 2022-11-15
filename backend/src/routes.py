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

INSERT_VALS_EX = """
INSERT INTO ArtWorks (name_, author_, description, start_year_, end_year_, materials, type_name,  museum_name, museum_address, genre_name, URL)
VALUES  ('Возьми мое сердце', 'Богданов Степан Семёнович', 'В своём стремлении повысить качество жизни, они забывают, что реализация намеченных плановых заданий, а также свежий взгляд на привычные вещи — безусловно открывает новые горизонты для дальнейших направлений развития. Противоположная точка зрения подразумевает, что предприниматели в сети интернет представляют собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Лишь тщательные исследования конкурентов набирают популярность среди определенных слоев населения, а значит, должны быть указаны как претенденты на роль ключевых факторов. Ясность нашей позиции очевидна: высокое качество позиционных исследований позволяет выполнить важные задания по разработке приоретизации разума над эмоциями.', '2016-10-11', '2016-12-11', 'Краски',
        'Скульптура', 'Great Secrets Museum', '109 Community College Rd Ahoskie NC 27910-9522 USA', 'Портрет', 'https://www.imgonline.com.ua/examples/bee-on-daisy.jpg')
        """


def test():
    db.execute(INSERT_VALS_EX)
    res = db.execute("""
    SELECT * FROM ArtWorks
    """)
    for i in res:
        print(i["name_"])
    
    print("Set: " + request.form['name'] + " as a value of 'key' | " + str(cache.set('key', request.form['name'], 0)))
    print("Value: " + cache.get('key'))
    return "It's me, Flask"
