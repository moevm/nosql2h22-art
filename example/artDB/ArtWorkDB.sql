DROP SCHEMA  IF EXISTS Main CASCADE;
CREATE SCHEMA IF NOT EXISTS Main;

CREATE TABLE Main.ArtWork(
    artWorkId SERIAL PRIMARY KEY,
    name_ varchar(200),
    author_ varchar(200),
    description varchar(10000),
    start_year_ DATE,
    end_year_ DATE,
    materials varchar(200),
    type_name varchar(100),
    museum_name varchar(200),
    museum_address varchar(200),
    genre_name varchar(100),
    URL varchar(10000)
);

INSERT INTO Main.ArtWork(name_, author_, description, start_year_, end_year_, materials,
                         type_name,  museum_name, museum_address, genre_name, URL)
VALUES  ('Возьми мое сердце', 'Богданов Степан Семёнович', 'В своём стремлении повысить качество жизни, они забывают, что реализация намеченных плановых заданий, а также свежий взгляд на привычные вещи — безусловно открывает новые горизонты для дальнейших направлений развития. Противоположная точка зрения подразумевает, что предприниматели в сети интернет представляют собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Лишь тщательные исследования конкурентов набирают популярность среди определенных слоев населения, а значит, должны быть указаны как претенденты на роль ключевых факторов. Ясность нашей позиции очевидна: высокое качество позиционных исследований позволяет выполнить важные задания по разработке приоретизации разума над эмоциями.', '2016-10-11', '2016-12-11', 'Краски',
        'Скульптура', 'Great Secrets Museum', '109 Community College Rd Ahoskie NC 27910-9522 USA', 'Портрет', 'https://www.imgonline.com.ua/examples/bee-on-daisy.jpg'),
    ('Встреча у берега', 'Одинцов Александр Геннадиевич','В своём стремлении повысить качество жизни, они забывают, что реализация намеченных плановых заданий, а также свежий взгляд на привычные вещи — безусловно открывает новые горизонты для дальнейших направлений развития. Противоположная точка зрения подразумевает, что предприниматели в сети интернет представляют собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Лишь тщательные исследования конкурентов набирают популярность среди определенных слоев населения, а значит, должны быть указаны как претенденты на роль ключевых факторов. Ясность нашей позиции очевидна: высокое качество позиционных исследований позволяет выполнить важные задания по разработке приоретизации разума над эмоциями.', '2016-10-11', '2018-02-15','Краски',
     'Фреска', 'Great Secrets Museum', '109 Community College Rd Ahoskie NC 27910-9522 USA',  'Исторический', 'https://www.imgonline.com.ua/examples/bee-on-daisy.jpg'),
    ('Сгореть дотла', 'Самсонов Тарас Григорьевич','Задача организации, в особенности же выбранный нами инновационный путь однозначно фиксирует необходимость прогресса профессионального сообщества. Задача организации, в особенности же экономическая повестка сегодняшнего дня обеспечивает широкому кругу (специалистов) участие в формировании поэтапного и последовательного развития общества. Имеется спорная точка зрения, гласящая примерно следующее: ключевые особенности структуры проекта, превозмогая сложившуюся непростую экономическую ситуацию, указаны как претенденты на роль ключевых факторов. Приятно, граждане, наблюдать, как реплицированные с зарубежных источников, современные исследования набирают популярность среди определенных слоев населения, а значит, должны быть обнародованы.', '2016-10-11', '2017-10-12', 'Краски',
       'Картина', 'Great Secrets Museum', '109 Community College Rd Ahoskie NC 27910-9522 USA', 'Мифологический', 'https://www.imgonline.com.ua/examples/bee-on-daisy.jpg'),
    ('Самый ядовитый чай', 'Давыдов Степан Андреевич', 'Задача организации, в особенности же выбранный нами инновационный путь однозначно фиксирует необходимость прогресса профессионального сообщества. Задача организации, в особенности же экономическая повестка сегодняшнего дня обеспечивает широкому кругу (специалистов) участие в формировании поэтапного и последовательного развития общества. Имеется спорная точка зрения, гласящая примерно следующее: ключевые особенности структуры проекта, превозмогая сложившуюся непростую экономическую ситуацию, указаны как претенденты на роль ключевых факторов. Приятно, граждане, наблюдать, как реплицированные с зарубежных источников, современные исследования набирают популярность среди определенных слоев населения, а значит, должны быть обнародованы.', '2016-10-11', '2016-11-10', 'Краски',
       'Фреска', 'Open Center', '1872 Acushnet Ave New Bedford MA 02720-3445 USA', 'Бытовой', 'https://www.imgonline.com.ua/examples/bee-on-daisy.jpg'),
    ('Голос внутри', 'Сысоев Панкрат Святославович', 'Противоположная точка зрения подразумевает, что стремящиеся вытеснить традиционное производство, нанотехнологии, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Но убеждённость некоторых оппонентов, в своём классическом представлении, допускает внедрение своевременного выполнения сверхзадачи. Как принято считать, диаграммы связей, превозмогая сложившуюся непростую экономическую ситуацию, описаны максимально подробно. Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: начало повседневной работы по формированию позиции не оставляет шанса для системы обучения кадров, соответствующей насущным потребностям.', '2016-10-11', '2017-01-13', 'Краски',
      'Картина',  'Museum of Minerals', '58138 US Highway 93 Pablo MT 59855 USA', 'Натюрморт', 'https://www.imgonline.com.ua/examples/bee-on-daisy.jpg'),
    ('Таяние льдов', 'Некрасов Егор Николаевич', 'Следует отметить, что постоянное информационно-пропагандистское обеспечение нашей деятельности говорит о возможностях инновационных методов управления процессами. Таким образом, сложившаяся структура организации требует определения и уточнения направлений прогрессивного развития. Принимая во внимание показатели успешности, высокотехнологичная концепция общественного уклада не оставляет шанса для благоприятных перспектив. Кстати, активно развивающиеся страны третьего мира освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, описаны максимально подробно.', '2016-10-11', '2016-10-20', 'Краски',
     'Картина',  'Open Center', '1872 Acushnet Ave New Bedford MA 02720-3445 USA', 'Исторический', 'https://www.imgonline.com.ua/examples/bee-on-daisy.jpg');