DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  CONSTRAINT unique_username UNIQUE (username)
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  done boolean DEFAULT false NOT NULL,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
