const mysql = require('mysql2/promise');
let pool; // Global connection pool

const USER = '', PASS = '';
async function connect({ host = 'localhost', port = 3306, dbName = 'test' }) {
  const user = USER || 'root';
  const password = PASS || '';
  console.log(`Connecting to MySQL at ${host}:${port}, using DB: ${dbName}`);
  try {
    // Close previous pool if it exists
    if (pool) {
      console.log('Closing previous MySQL pool');
      await pool.end();
    }
    // Create new pool
    pool = mysql.createPool({host,port,database: dbName,user,password,waitForConnections: true,connectionLimit: 10,queueLimit: 0
    });

    console.log('Connection to MySQL established');
    return pool;
  } catch (err) {
    console.error('Connection failed:', err);
    throw err;
  }
}

// Export both connect and a way to access the pool
module.exports = { connect };
