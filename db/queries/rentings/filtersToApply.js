const getPool = require('../../getDB.js');

const filtersToApply = async (queryParams) => {
  const pool = await getPool();
  const { rent_location, min_price, max_price, min_rooms, max_rooms } =
    queryParams;

  let sqlQuery = 'SELECT * FROM rentings';
  const values = [];
  let clause = 'WHERE';

  if (rent_location) {
    sqlQuery += ` ${clause} rent_location LIKE ?`;
    values.push(`%${rent_location}%`);
    clause = 'AND';
  }

  if (min_price) {
    sqlQuery += ` ${clause} rent_price > ?`;
    values.push(min_price);
    clause = 'AND';
  }

  if (max_price) {
    sqlQuery += ` ${clause} rent_price < ?`;
    values.push(max_price);
    clause = 'AND';
  }

  if (min_rooms) {
    sqlQuery += ` ${clause} rent_rooms > ?`;
    values.push(min_rooms);
    clause = 'AND';
  }

  if (max_rooms) {
    sqlQuery += ` ${clause} rent_rooms < ?`;
    values.push(max_rooms);
    clause = 'AND';
  }

  const [rentings] = await pool.query(sqlQuery, values);
  return rentings;
};

module.exports = filtersToApply;
