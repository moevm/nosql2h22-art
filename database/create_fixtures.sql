CREATE TABLE IF NOT EXISTS ArtWorks (
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