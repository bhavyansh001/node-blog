const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool
.connect()
.then(() => console.log("Database connected..."))
.catch((err) => console.error("Error connecting to DB:", err));

async function initializeDatabase() {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS blogs (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          body TEXT NOT NULL
        )
      `);
    console.log("Database initialized successfully");
  } catch (err) {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  }
}

module.exports = { pool, initializeDatabase };
