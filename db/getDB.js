const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

let pool;

async function getDB() {
  if (!pool) {
    pool = mysql.createPool({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      timezone: 'local',
    });
  }

  await pool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`);

  return pool;
}

module.exports = getDB;
