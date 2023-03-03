CREATE DATABASE social_media;

USE social_media;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE tokens (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  access_token VARCHAR(255) NOT NULL,
  page_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
