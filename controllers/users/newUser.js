const bcrypt = require('bcrypt');
const newUser = require('../../db/queries/users/newUser');
const crypto = require('crypto');
const { sendMail } = require('../../helpers');

const createNewUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const registrationCode = crypto.randomUUID();

    const userId = await newUser({
      ...req.body,
      password: encryptedPassword,
      registrationCode: registrationCode,
    });

    await sendMail({
      to: email,
      subject: 'Verifica tu correo electrónico',
      HTMLPart: `Por favor, introduce el siguiente código para validar tu cuenta.<br/>${registrationCode}`,
    });

    res.status(201).send({
      status: 'ok',
      data: { email, username, createdAt: new Date() },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createNewUser;
