CREATE DATABASE 2FA;

\c 2FA;

CREATE TABLE accounts(
    id SERIAL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);
