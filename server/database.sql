CREATE DATABASE pern_todo;

CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    task VARCHAR(255)
);