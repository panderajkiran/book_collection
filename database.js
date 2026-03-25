// Import the pg library to connect to PostgreSQL
const { Pool } = require("pg");
require("dotenv").config(); // Load environment variables

// Create a connection pool to PostgreSQL
// This allows us to reuse connections efficiently
// Using DATABASE_URL for simpler configuration (recommended)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for cloud databases like Neon
});

// Test the connection
pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected error on idle client", err);
});

module.exports = pool;
