const { generateError, sendMail } = require('../../../helpers');
const getPool = require('../../getDB.js');

const updatePass = async (resetPassCode, email, hashedPass) => {
  try {
    const pool = await getPool();

    const [checkPassCode] = await pool.query(
      `
      SELECT * FROM users WHERE resetPassCode = ?
      `,
      [resetPassCode]
    );

    if (checkPassCode.length == 0) {
      throw generateError('Código invalido', 403);
    }

    const [changePass] = await pool.query(
      `
        UPDATE users SET password = ?
        WHERE email = ?;
      `,
      [hashedPass, email]
    );

    await sendMail({
      to: email,
      subject: 'Contraseña actualizada',
      HTMLPart: `Tu contraseña ha sido cambiada, si no has sido tú, ponte en contacto con nosotros.`,
    });
  } catch (error) {
    console.error('Error al modificar el usuario:', error);
    throw error;
  }
};

module.exports = updatePass;
