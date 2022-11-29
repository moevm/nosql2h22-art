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
