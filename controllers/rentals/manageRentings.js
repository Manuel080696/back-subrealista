const {
  updateRentalRequest,
} = require('../../db/queries/rentals/updateRentalRequest.js');
const tenantEmail = require('../../db/queries/rentals/tenantEmail.js');
const jwt = require('jsonwebtoken');
const sendMail = require('../../helpers/sendMail.js');

const manageRentings = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const username = decodedToken.username;
    const { rental_status } = req.body;
    const { id } = req.params;

    await updateRentalRequest(username, rental_status, id);
    const toEmail = await tenantEmail(id);

    if (rental_status === 'Aceptado') {
      await sendMail({
        to: toEmail,
        subject: '¡Tu estancia ha sido validada!',
        HTMLPart:
          'El dueño ha validado tu estancia, inicia sesión para ver más detalles',
      });
      res.send({
        status: 'ok',
        message: `¡El alquiler ${id} ha sido aceptado!`,
      });
    } else {
      await sendMail({
        to: toEmail,
        subject: '¡Tu estancia ha sido rechazada!',
        HTMLPart:
          'El dueño ha rechazado tu estancia, inicia sesión para ver más detalles',
      });
      res.send({
        status: 'ok',
        message: `¡El alquiler ${id} ha sido rechazado!`,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = manageRentings;
