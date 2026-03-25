// Database initialization script
// Run this with: node init-db.js
// This will create the books table from scratch

const { Client } = require("pg");
require("dotenv").config(); // Load environment variables

// Database connection details
const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false } // Required for Neon
});

// SQL to create the books table
const createTableSQL = `
  CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(20),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    date_read DATE,
    review TEXT,
    cover_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// Connect and create table
async function initializeDatabase() {
  try {
    console.log("🔗 Connecting to PostgreSQL...");
    await client.connect();
    console.log("✅ Connected!");

    console.log("📋 Creating books table...");
    await client.query(createTableSQL);
    console.log("✅ Books table created (or already exists)!");

    // Add a sample book
    const sampleBook = `
      INSERT INTO books (title, author, isbn, rating, date_read, review) 
      VALUES 
      ('The Midnight Library', 'Matt Haig', '9780857525555', 5, '2024-01-15', 'Amazing exploration of life choices and possibilities!')
      ON CONFLICT DO NOTHING;
    `;

    await client.query(sampleBook);
    console.log("✅ Sample book added!");

    // Verify
    const result = await client.query("SELECT COUNT(*) FROM books");
    console.log(`📊 Total books in database: ${result.rows[0].count}`);
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await client.end();
    console.log("🔌 Database connection closed");
  }
}

// Run the initialization
initializeDatabase();
