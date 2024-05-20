CREATE DATABASE attendance;

CREATE TABLE accounts(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(255) NOT NULL
);

CREATE TABLE time(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    checkin VARCHAR(255),
    checkout VARCHAR(255),
    date VARCHAR(255)
);

CREATE TABLE weekly(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    username VARCHAR(255) NOT NULL,
    week VARCHAR(69) NOT NULL,
    monday VARCHAR[2] DEFAULT ARRAY['n/a', 'n/a']::VARCHAR[],
    tuesday VARCHAR[2] DEFAULT ARRAY['n/a', 'n/a']::VARCHAR[],
    wednesday VARCHAR[2] DEFAULT ARRAY['n/a', 'n/a']::VARCHAR[],
    thursday VARCHAR[2] DEFAULT ARRAY['n/a', 'n/a']::VARCHAR[],
    friday VARCHAR[2] DEFAULT ARRAY['n/a', 'n/a']::VARCHAR[]
);

INSERT INTO accounts (username, password, email, role) VALUES ('Nille', 'TE4NTI', 'niclas@ga.ntig.se', 'Teacher');



SELECT * FROM accounts;
SELECT * FROM time;
SELECT * FROM weekly;

DELETE FROM time WHERE user_id = 2;
DELETE FROM accounts WHERE id = 5;
DELETE FROM weekly WHERE name = 'test';

INSERT INTO weekly (user_id, username, week, monday, tuesday, wednesday, thursday, friday) VALUES (1, 'Max', 39, ARRAY['8:00', '12:00'], ARRAY['8:00', '12:00'], ARRAY['8:00', '12:00'], ARRAY['8:00', '12:00'], ARRAY['8:00', '12:00']);
INSERT INTO weekly (user_id, username, week, monday) VALUES (2, 'Yoe', 4, ARRAY['8:00', '12:00']);

SELECT * FROM accounts WHERE username = 'name' AND password = 'i dont care';

SELECT accounts.username, time.checkin, time.checkout, time.date FROM accounts INNER JOIN time ON accounts.id = time.user_id ORDER BY time.date DESC;
