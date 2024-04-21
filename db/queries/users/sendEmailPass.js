const getPool = require('../../getDB');
const { generateError, sendMail } = require('../../../helpers');
const { reset } = require('nodemon');

const sendEmailPass = async (email, resetPassCode) => {
  try {
    const pool = await getPool();

    const [checkEmail] = await pool.query(
      `
        SELECT * FROM users WHERE email=?;
      `,
      [email]
    );

    if (checkEmail.length === 0) {
      throw generateError('Este email no existe', 403);
    }

    const [passCode] = await pool.query(
      `
        UPDATE users SET resetPassCode = ?
        WHERE email = ?;
      `,
      [resetPassCode, email]
    );

    await sendMail({
      to: email,
      subject: 'Actualiza tu contraseña',
      HTMLPart: `Para cambiar tu contraseña, <a href='https://subrealista.alwaysdata.net/recovery/${registrationCode}'>haz click aquí</a> o utiliza este código: ${resetPassCode}`,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = sendEmailPass;
