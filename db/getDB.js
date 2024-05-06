const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD } = process.env;

let pool;

async function getDB() {
  if (!pool) {
    pool = mysql.createPool({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      timezone: 'local',
    });
  }

  return pool;
}

module.exports = getDB;
