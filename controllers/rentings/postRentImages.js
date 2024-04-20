const { postNewImages } = require('../../db/queries/rentings/postNewImages.js');
const path = require('path');
const { randomUUID } = require('crypto');
const { createPathIfNotExists } = require('../../helpers/generateError.js');
const sharp = require('sharp');
const jwt = require('jsonwebtoken');

const postRentImages = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const username = decodedToken.username;
    const { id } = req.params;

    const HOST =
      'http://' +
      (process.env.HOST || 'localhost') +
      ':' +
      (process.env.PORT || 3000);

    const array = Object.values(req.files).slice();

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
      const imageName = array[index].name;
      const ext = path.extname(imageName).toLowerCase();
      const newName = `${uuid}${ext}`;
      const imgUrl = `${HOST}/uploads/rent_images/${newName}`;

      if (req.files && array[index]) {
        await sharp(array[index].data)
          .resize(1920, 1080)
          .toFile(path.join(directory, newName), (err) => {
            if (err) {
              console.error(err);
            }
          });
      }
      await postNewImages(id, username, imgUrl);
    }

    res.send({
      status: 'ok',
      message: 'Fotos subidas con éxito',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = postRentImages;
