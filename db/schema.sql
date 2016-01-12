DROP TABLE IF EXISTS stories;
DROP TABLE IF EXISTS opinions;

CREATE TABLE stories (
  id serial primary key,
  title varchar(80),
  link varchar(200),
  image varchar(200),
  summary varchar(1000)
);

CREATE TABLE opinions (
  id serial primary key,
  story_id int references stories(id) on delete cascade,
  opinion varchar(1000)
);