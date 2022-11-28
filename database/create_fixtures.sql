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