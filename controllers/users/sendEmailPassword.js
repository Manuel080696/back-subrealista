const crypto = require('crypto');
const emailPass = require('../../db/queries/users/sendEmailPass.js');

const sendEmailPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const resetPassCode = crypto.randomUUID();

    await emailPass(email, resetPassCode);

    res.status(201).send({
      status: 'ok',
      message:
        'El código para recuperar la contraseña se ha enviado con éxito.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = sendEmailPassword;
