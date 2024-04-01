const bookRental = async (req, res, next) => {
  try {
    const {} = req.body;
  } catch (error) {
    next(error);
  }
};

module.exports = bookRental;
