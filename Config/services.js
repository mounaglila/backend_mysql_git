const { getPool } = require('./dbConnection');

async function fetchData() {
  const pool = getPool();
  const [tables] = await pool.query("SHOW TABLES");
  const data = {};
  for (const row of tables) {
    const tableName = Object.values(row)[0];
    const [rows] = await pool.query(`SELECT * FROM \`${tableName}\``);
    data[tableName] = rows;
  }
  return data;
}

// Fetch all table names
async function getTableNames() {
  const pool = getPool();
  const [results] = await pool.query('SHOW TABLES');
  return results.map(row => Object.values(row)[0]);
}
// Fetch a single item by its ID from a specific table
async function getItemById(table, id) {
  const pool = getPool();
  const [rows] = await pool.query(`SELECT * FROM \`${table}\` WHERE id = ?`, [id]);
  return rows[0] || null;
}
// Update a specific item by its ID
async function updateItemById(table, id, updateFields) {
  const pool = getPool();
  const keys = Object.keys(updateFields);
  const values = Object.values(updateFields);

  if (keys.length === 0) return null;

  const setClause = keys.map(key => `\`${key}\` = ?`).join(', ');
  const sql = `UPDATE \`${table}\` SET ${setClause} WHERE id = ?`;
  const [result] = await pool.query(sql, [...values, id]);
  return result;
}
// Delete an item by its ID
async function deleteItemById(table, id) {
  const pool = getPool();
  const [result] = await pool.query(`DELETE FROM \`${table}\` WHERE id = ?`, [id]);
  return result;
}
// Drop a complete table from the database
async function deleteTableByName(tableName) {
  const pool = getPool();
  const [result] = await pool.query(`DROP TABLE \`${tableName}\``);
  return result;
}
module.exports = {
  fetchData,
  getTableNames,
  getItemById,
  updateItemById,
  deleteItemById,
  deleteTableByName,
};
