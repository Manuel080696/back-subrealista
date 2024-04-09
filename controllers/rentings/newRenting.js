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
    const uuid = randomUUID();
    const directory = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      'rent_images'
    );
    await createPathIfNotExists(directory);
    const imageName = req.files.rent_cover.name;
    const ext = path.extname(imageName).toLowerCase();
    const newName = `${uuid}${ext}`;
    const imgUrl = `${HOST}/uploads/rent_images/${newName}`;

    if (req.files && req.files.rent_cover) {
      await sharp(req.files.rent_cover.data)
        .resize(1920, 1080)
        .toFile(path.join(directory, newName), (err) => {
          if (err) {
            console.error(err);
          }
        });
    }

    const {
      rent_title,
      rent_type,
      rent_rooms,
      rent_description,
      rent_price,
      rent_location,
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

    const rent_id = await createRenting(
      rent_title,
      rent_type,
      rent_rooms,
      rent_description,
      rent_price,
      rent_location,
      imgUrl,
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
        imgUrl,
      },
      message: `${rent_title} se ha publicado con éxito.`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = newRenting;
