// Import the pg library to connect to PostgreSQL
const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables

// Create a connection pool to PostgreSQL
// This allows us to reuse connections efficiently
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false } // Required for cloud databases like Neon
});

// Test the connection
pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected error on idle client", err);
});

module.exports = pool;
