const { createRenting } = require('../../db/queries/rentings/createRenting.js');
const path = require('path');
const { randomUUID } = require('crypto');
const { createPathIfNotExists } = require('../../helpers/generateError.js');
const sharp = require('sharp');
const jwt = require('jsonwebtoken');

const newRenting = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const username = decodedToken.username;

    const HOST =
      'http://' +
      (process.env.HOST || 'localhost') +
      ':' +
      (process.env.PORT || 3000);

    //Procesado imagenes
    /* const uuid = randomUUID();
    const directory = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      'rent_images'
    );
    await createPathIfNotExists(directory); */

    //Arreglo
    /* console.log(req.files);
    const files = req.files;
    const uploadedImages = Array.isArray(files) ? files : [files];
    const arrayImgURL = [];

    for (const file of uploadedImages) {
      const imageName = file.name;

      const ext = path.extname(imageName).toLowerCase();
      const newName = `${uuid}${ext}`;

      if (file) {
        sharp(file)
          .webp({ effort: 6 })
          .toFile(path.join(directory, newName), (err) => {
            if (err) {
              console.error(err);
            }
          });
      }

      const imgUrl = `${HOST}/uploads/rent_images/${newName}`;
      if (imgUrl) {
        arrayImgURL.append(imgUrl);
      }
    }
    console.log(req.files); */

    /*    if (req.files) {
      await sharp(req.files)
        .resize(1920, 1080)
        .toFile(path.join(directory, newName), (err) => {
          if (err) {
            console.error(err);
          }
        });
    } */

    const {
      rent_title,
      rent_type,
      rent_rooms,
      rent_description,
      rent_price,
      rent_location,
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

    let address = '';
    if (rent_address.street.length > 0) {
      address.concat(rent_address.street);
    }
    if (rent_address.city.length > 0) {
      address.concat(rent_address.city);
    }
    if (rent_address.state.length > 0) {
      address.concat(rent_address.state);
    }
    if (rent_address.postalCode.length > 0) {
      address.concat(rent_address.postalCode);
    }

    const rent_id = await createRenting(
      rent_title,
      rent_type,
      rent_rooms,
      rent_description,
      rent_price,
      address,
      rent_location,
      services,
      username
    );

    res.send({
      status: 'ok',
      rent_id,
      data: {
        rent_title,
        rent_type,
        rent_rooms,
        rent_description,
        rent_price,
        rent_location,
      },
      message: `${rent_title} se ha publicado con éxito.`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = newRenting;
