const { createRenting } = require('../../db/queries/rentings/createRenting.js');
const jwt = require('jsonwebtoken');
const path = require('path');
const { randomUUID } = require('crypto');
const { createPathIfNotExists } = require('../../helpers/index.js');
const sharp = require('sharp');
const { postNewImages } = require('../../db/queries/rentings/postNewImages.js');

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
      images,
    } = req.body;

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
    }

    const rent_id = await createRenting(
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

    const rentId = rent_id[0].rent_id;

    if (images) {
      const HOST =
        'http://' +
        (process.env.HOST || 'localhost') +
        ':' +
        (process.env.PORT || 3000);
      const array = Object.values(images).slice();

      //Procesado imagenes
      for (let index = 0; index < array.length; index++) {
        const uuid = randomUUID();
        const directory = path.join(
          __dirname,
          '..',
          '..',
          'uploads',
          'rent_images'
        );
        await createPathIfNotExists(directory);
        console.log(array[index]);
        const imageName = array[index].name;
        const ext = path.extname(imageName).toLowerCase();
        const newName = `${uuid}${ext}`;
        const imgUrl = `${HOST}/uploads/rent_images/${newName}`;

        if (req.files && array[index]) {
          await sharp(array[index].data)
            .webp({ effort: 6 })
            .toFile(path.join(directory, newName), (err) => {
              if (err) {
                console.error(err);
              }
            });
        }
        await postNewImages(username, rentId, imgUrl);
      }
    }

    res.send({
      status: 'ok',
      message: 'Alquiler creado con éxito',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = newRenting;
