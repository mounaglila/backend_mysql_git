const mysql = require('mysql2/promise');
const USER = '', PASS = '';
let connection;
async function connect({ host = 'localhost', port = 3306, dbName = 'ecommerce_db' }) {
  const auth = USER && PASS ? `${USER}:${PASS}@` : '';
  try {
    if (connection && connection.connection && connection.connection.state !== 'disconnected') {
      return connection;
    }
    console.log(`→ Connecting to MySQL at ${host}:${port}, database: ${dbName}`);
    connection = await mysql.createConnection({host,port,user: USER || 'root',password: PASS || '',database: dbName});
    console.log('→ MySQL connection established');
    return connection;
  } catch (err) {
    console.error('Connection failed:', err);
    throw err;
  }
}
module.exports = { connect };