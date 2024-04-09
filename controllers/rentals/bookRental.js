const postRental = require('../../db/queries/rentals/postRental.js');
const ownerEmail = require('../../db/queries/rentals/ownerEmail.js');
const jwt = require('jsonwebtoken');
const sendMail = require('../../helpers/sendMail.js');

const bookRental = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const username = decodedToken.username;
    const { id } = req.params;
    const { rental_start, rental_end } = req.body;

    const confirmation = await postRental(
      id,
      username,
      rental_start,
      rental_end
    );
    const toEmail = await ownerEmail(id);

    await sendMail({
      to: toEmail,
      subject: `¡${username} ha hecho una reserva!`,
      HTMLPart: `${username} ha reservado tu alojamiento desde el ${rental_start} hasta el ${rental_end}, por favor inicia sesión para aceptar o rechazar esta oferta.`,
    });

    res.send({
      status: 'ok',
      message: `Reserva con id ${confirmation} creada con exito`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = bookRental;
