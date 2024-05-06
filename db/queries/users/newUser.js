const getPool = require('../../getDB');

const newUser = async ({
  username,
  email,
  address,
  bio,
  password,
  registrationCode,
}) => {
  try {
    const pool = await getPool();
    const [{ insertID }] = await pool.query(
      `
      INSERT INTO users
      (username, email, address, bio, password, registrationCode) VALUES (?, ?, ?, ?, ?, ?)`,
      [username, email, address, bio, password, registrationCode]
    );
    return insertID;
  } catch (error) {
    console.error('Error al crear tu usuario: ', error);
    throw error;
  }
};

module.exports = newUser;
