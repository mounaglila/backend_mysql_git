const mysql = require('mysql2/promise');
const USER = '', PASS = '';
let pool;
async function connect({ host = 'localhost', port = 3306, dbName = 'ma_base' }) {
  try {
    if (!pool) {
      console.log(`Connecting to MySQL at ${host}:${port}, database: ${dbName}`);
      pool = mysql.createPool({
        host,
        port,
        user: USER,
        password: PASS,
        database: dbName,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
    }
    return pool;
  } catch (err) {
    console.error('Connection failed:', err);
    throw err;
  }
}
module.exports = { connect };
