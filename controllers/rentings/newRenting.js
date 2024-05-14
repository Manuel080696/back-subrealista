const { createRenting } = require('../../db/queries/rentings/createRenting.js');
const jwt = require('jsonwebtoken');

const newRenting = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const username = decodedToken.username;

    const {
      rent_title,
      rent_type,
      rent_rooms,
      rent_description,
      rent_price,
      rent_address,
      elevator,
      near_beach,
      near_mountain,
      hairdryer,
      washing_machine,
      ac,
      smoke_detector,
      first_kit_aid,
      wifi,
      refrigerator,
      freezer,
      toaster,
      fully_equipped,
    } = req.body;

    const { images } = req.files;

    const services = {
      elevator,
      near_beach,
      near_mountain,
      hairdryer,
      washing_machine,
      ac,
      smoke_detector,
      first_kit_aid,
      wifi,
      refrigerator,
      freezer,
      toaster,
      fully_equipped,
    };

    const rentLocations = [
      'Andalucia',
      'Aragon',
      'Asturias',
      'Balears',
      'Canarias',
      'Cantabria',
      'Castilla y Leon',
      'Castilla La Mancha',
      'Cataluña',
      'Comunidad Valenciana',
      'Extremadura',
      'Galicia',
      'Madrid',
      'Murcia',
      'Navarra',
      'Pais Vasco',
      'Rioja',
      'Ceuta',
      'Melilla',
    ];

    const findMatchingLocation = (address) => {
      return rentLocations.find((location) => address.includes(location));
    };

    let rent_location;
    // Si rent_location no está definido y hay rent_address, intenta buscar una coincidencia
    if (rent_address) {
      rent_location = findMatchingLocation(rent_address);
      console.log(rent_location);
    }

    await createRenting(
      rent_title,
      rent_type,
      rent_rooms,
      rent_description,
      rent_price,
      rent_address,
      rent_location,
      services,
      username
    );
  } catch (error) {
    next(error);
  }
};

module.exports = newRenting;
