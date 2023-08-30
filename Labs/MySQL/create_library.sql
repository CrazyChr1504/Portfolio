
DROP DATABASE library;
CREATE DATABASE library 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_0900_ai_ci;
use library;
DROP TABLE books;
CREATE TABLE books(
        BookID int NOT NULL AUTO_INCREMENT,
        Title nvarchar(255),
        AuthorName nvarchar(255),
        ISBN nvarchar(255),
        PRIMARY KEY(ID)
);
CREATE TABLE user(
        UserID int NOT NULL AUTO_INCREMENT,
        PName nvarchar(255)
);
CREATE TABLE order(
        orderID int NOT NULL AUTO_INCREMENT,
        UserID int,
        BookID int
);

source Book_Table.sql
source User_Table.sql

SELECT * FROM books;
SELECT * FROM person;

