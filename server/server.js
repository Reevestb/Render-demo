import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv, { config } from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const dbConnectionString = process.env.DATABASE_URL;

export const db = new pg.Pool({
  connectionString: dbConnectionString,
});

const PORT = 7430;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (request, response) => {
  response.json({ message: "this is root route" });
});

app.get("/favcars", async (request, response) => {
  const result = await db.query(
    `
    SELECT * FROM Favourite_Cars 
  `
  );
  response.json(result.rows);
});

app.post("/favcars", async (request, response) => {
  const { Brand, Model, Year, Rating } = request.body;
  try {
    await db.query(
      `INSERT into Favourite_Cars (Brand, Model, Year, Rating) VALUES ($1, $2, $3, $4)`,
      [Brand, Model, Year, Rating]
    );
    response.status(200).json({ success: true });
  } catch (error) {
    console.error("No data is getting inserted");
    response.status(500).json({ success: false });
  }
  response.json(result.rows);
});

app.get("/favouritecars", async (request, response) => {
  const result = await db.query(
    `
      SELECT * FROM Favourite_Cars WHERE Rating = $1
      `,
    [10]
  );
  response.json(result.rows);
});

app.get("/favourcars", async (request, response) => {
  const result = await db.query(
    `
      SELECT * FROM Favourite_Cars WHERE Rating = $1 AND Brand = $2
      `,
    [10, "Ford"]
  );
  response.json(result.rows);
});
