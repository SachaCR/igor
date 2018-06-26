-- Create table here

DROP TABLE IF EXISTS resource;

CREATE TABLE resource (
  id SERIAL PRIMARY KEY NOT NULL,
  title varchar(255) NOT NULL,
  type varchar(32) NOT NULL,
  category varchar(32) NOT NULL
);
