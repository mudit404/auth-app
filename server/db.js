const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { open } = require('sqlite');

// Database connection
async function getDbConnection() {
  return open({
    filename: path.join(__dirname, 'auth.db'),
    driver: sqlite3.Database
  });
}

// Initialize database by creating tables if they don't exist
async function initDb() {
  const db = await getDbConnection();
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      quote TEXT
    )
  `);
  
  await db.close();
  console.log('Database initialized');
}

module.exports = {
  getDbConnection,
  initDb
};