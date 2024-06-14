import { db } from "./server.js";

db.query(`CREATE TABLE IF NOT EXISTS Favourite_Cars (
    id SERIAL PRIMARY KEY,
    Brand VARCHAR(255),
    Model VARCHAR(255),
    Year DATE,
    Rating INTEGER
)`);
db.query(`INSERT INTO Favourite_Cars (Brand, Model, Year, Rating)
    VALUES ('Ford', 'Mustang', '1969-01-01', 9),
    ('Porche', 'GT3', '2022-01-01', 8),
    ('Aston Martin', 'Valour', '2023-01-01', 10),
    ('Ferrari', '488 pista', '2018-03-06', 7)`);
