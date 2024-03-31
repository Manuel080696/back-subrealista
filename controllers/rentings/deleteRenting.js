const { deleteRental } = require('../../db/queries/rentings/deleteRental.js');
const jwt = require('jsonwebtoken');

const deleteRenting = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const rent_owner = decodedToken.id;
    const rent_id = req.params.id;

    await deleteRental(rent_owner, rent_id);

    res.send({
      status: 'ok',
      message: `El alquiler con id ${rent_id} se ha eliminado.`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteRenting;
