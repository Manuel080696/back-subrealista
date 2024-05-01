const bcrypt = require('bcrypt');
const updatePass = require('../../db/queries/users/updatePass.js');

const changePassword = async (req, res, next) => {
  try {
    const { resetPassCode } = req.params;
    const { email, newPass, repeatPass } = req.body;

    if (newPass !== repeatPass) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden.' });
    }

    const hashedPass = await bcrypt.hash(newPass, 10);

    await updatePass(resetPassCode, email, hashedPass);

    res.status(200).send({
      status: 'ok',
      message: 'La contraseña se ha cambiado con éxito.',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = changePassword;
