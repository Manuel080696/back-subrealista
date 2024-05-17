const sharp = require('sharp');
const { randomUUID } = require('crypto');
const path = require('path');
const { createUpload } = require('../../helpers/index.js');

const { createRenting } = require('../../db/queries/rentings/createRenting.js');
const jwt = require('jsonwebtoken');

const newRenting = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const username = decodedToken.username;

    const { images } = req.files;

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

    const services = {
      elevator: elevator === 'true' ? 1 : 0,
      near_beach: near_beach === 'true' ? 1 : 0,
      near_mountain: near_mountain === 'true' ? 1 : 0,
      hairdryer: hairdryer === 'true' ? 1 : 0,
      washing_machine: washing_machine === 'true' ? 1 : 0,
      ac: ac === 'true' ? 1 : 0,
      smoke_detector: smoke_detector === 'true' ? 1 : 0,
      first_kit_aid: first_kit_aid === 'true' ? 1 : 0,
      wifi: wifi === 'true' ? 1 : 0,
      refrigerator: refrigerator === 'true' ? 1 : 0,
      freezer: freezer === 'true' ? 1 : 0,
      toaster: toaster === 'true' ? 1 : 0,
      fully_equipped: fully_equipped === 'true' ? 1 : 0,
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
      // Función para quitar acentos de una cadena de texto
      const removeAccents = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      };

      // Quitamos acentos del address
      const addressWithoutAccents = removeAccents(address);

      return rentLocations.find((location) =>
        addressWithoutAccents.includes(location)
      );
    };

    let rent_location;
    // Si rent_location no está definido y hay rent_address, intenta buscar una coincidencia
    if (rent_address) {
      rent_location = findMatchingLocation(rent_address);
    }

    const processedImages = [];

    for (const image of images) {
      let imageFileName;
      const uploadsDir = path.join(__dirname, '../../uploads');
      await createUpload(uploadsDir);
      const photosDir = path.join(__dirname, `../../uploads/rent_images/`);
      await createUpload(photosDir);
      const processedImage = sharp(image.data)
        .toFormat('webp')
        .webp({ effort: 6, quality: 80 })
        .resize({ with: 640, height: 800, fit: 'contain' });
      imageFileName = `${randomUUID()}.webp`;
      await processedImage.toFile(path.join(photosDir, imageFileName));
      if (processedImage) {
        processedImages.push(
          `http://localhost:3000/uploads/rent_images/${imageFileName}`
        );
        console.log(
          `http://localhost:3000/uploads/rent_images/${imageFileName}`
        );
        /* processedImages.push(processedImage); */
      }
    }

    if (processedImages.length === images.length) {
      await createRenting(
        rent_title,
        rent_type,
        rent_rooms,
        rent_description,
        rent_price,
        rent_address,
        rent_location,
        processedImages,
        services,
        username
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = newRenting;
