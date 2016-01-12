DROP TABLE IF EXISTS stories;

CREATE TABLE stories (
  id serial primary key,
  title varchar(80),
  link varchar(200),
  image varchar(200),
  summary varchar(1000)
);