const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

let pool;

async function getDB() {
  if (!pool) {
    const connection = await mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      timezone: 'Z',
    });
  }

  return pool;
}

module.exports = getDB;
