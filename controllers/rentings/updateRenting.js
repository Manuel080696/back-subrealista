const path = require('path');
const { randomUUID } = require('crypto');
const { createPathIfNotExists } = require('../../helpers/generateError.js');
const sharp = require('sharp');
const { updateRent } = require('../../db/queries/rentings/updateRent.js');
const jwt = require('jsonwebtoken');

const updateRenting = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const rent_owner = decodedToken.username;
    const rent_id = req.params.id;
    let imgUrl;
    const {
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

    const HOST =
      'http://' +
      (process.env.HOST || 'localhost') +
      ':' +
      (process.env.PORT || 3000);

    //Procesado imagenes
    if (req.files && req.files.rent_cover) {
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
      imgUrl = `${HOST}/uploads/rent_images/${newName}`;
      await sharp(req.files.rent_cover.data)
        .webp({ effort: 6 })
        .toFile(path.join(directory, newName), (err) => {
          if (err) {
            console.error(err);
          }
        });
    }

    const newData = {
      ...(req.body.rent_title && { rent_title: req.body.rent_title }),
      ...(req.body.rent_type && { rent_type: req.body.rent_type }),
      ...(req.body.rent_rooms && { rent_rooms: req.body.rent_rooms }),
      ...(req.body.rent_description && {
        rent_description: req.body.rent_description,
      }),
      ...(req.body.rent_price && { rent_price: req.body.rent_price }),
      ...(req.body.rent_location && { rent_location: req.body.rent_location }),
    };

    const rowsAffected = await updateRent(
      newData.rent_title,
      newData.rent_type,
      newData.rent_rooms,
      newData.rent_description,
      newData.rent_price,
      newData.rent_location,
      rent_id,
      imgUrl,
      services,
      rent_owner
    );

    if (rowsAffected === 0) {
      return res
        .status(400)
        .json({ error: 'No hay ningún dato para actualizar' });
    }

    res.status(200).send({
      status: 'ok',
      data: { newData },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateRenting;
