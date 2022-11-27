DROP TABLE IF EXISTS ArtWorks;

CREATE TABLE  ArtWorks (
    artworkid SERIAL PRIMARY KEY,
    name varchar(200),
    author varchar(200),
    description varchar(8000),
    startYear DATE,
    endYear DATE,
    materials varchar(200),
    type varchar(100),
    museumName varchar(200),
    museumAddress varchar(200),
    genre varchar(100),
    URL varchar(8000)
);

