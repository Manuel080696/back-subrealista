require('dotenv').config();
const getDB = require('./getDB.js');
const bcrypt = require('bcrypt');

const populate = async () => {
  let connection = await getDB();
  try {
    const defaultPassword = 'Pass1234';
    const hashedPass = await bcrypt.hash(defaultPassword, 10);

    console.log('Rellenando tabla users');
    await connection.query(
      `
        INSERT INTO users (username, email, password, active)
        VALUES 
        ('Manu','manu@email.com','${hashedPass}', 1),
        ('Oscar','oscar@email.com','${hashedPass}', 1),
        ('Yese','yese@email.com','${hashedPass}', 1),
        ('Toni','toni@email.com','${hashedPass}', 1),
        ('Paco','paco@email.com','${hashedPass}', 1),
        ('Elena','elena@email.com','${hashedPass}', 1),
        ('Selene','selene@email.com','${hashedPass}', 1),
        ('Esteban','esteban@email.com','${hashedPass}', 1),
        ('Maria','maria@email.com','${hashedPass}', 1),
        ('Susana','susana@email.com','${hashedPass}', 1)
      `
    );

    console.log('Rellenando tabla rentings');
    await connection.query(
      `
        INSERT INTO rentings (rent_owner, rent_title, rent_type, rent_rooms, rent_description, rent_price, rent_location, rent_cover)
        VALUES 
        ('Manu', 'Piso en playa', 'Piso', 4, 'Piso cerca de la playa', 350, 'Andalucia', 'Foto Cover'),
        ('Manu', 'Chalet de campo', 'Chalet', 3, 'Chalet de campo', 350, 'Aragon', 'Foto Cover'),
        ('Oscar', 'Piso en playa', 'Piso', 2, 'Piso cerca de la playa', 350, 'Asturias', 'Foto Cover'),
        ('Oscar', 'Casa rural', 'Casa', 7, 'Casa rural', 350, 'Balears', 'Foto Cover'),
        ('Yese', 'Chalet de campo', 'Chalet', 2, 'Chalet de campo', 350, 'Canarias', 'Foto Cover'),
        ('Yese', 'Piso en playa', 'Piso', 5, 'Piso cerca de la playa', 350, 'Cantabria', 'Foto Cover'),
        ('Toni', 'Apartamento rural', 'Apartamento', 7, 'Apartamento rural', 350, 'Castilla y Leon', 'Foto Cover'),
        ('Toni', 'Chalet de campo', 'Chalet', 3, 'Chalet de campo', 350, 'Castilla La Mancha', 'Foto Cover'),
        ('Paco', 'Piso en playa', 'Piso', 1, 'Piso cerca de la playa', 350, 'Cataluña', 'Foto Cover'),
        ('Paco', 'Casa rural', 'Casa', 8, 'Casa rural', 350, 'Comunidad Valenciana', 'Foto Cover'),
        ('Elena', 'Chalet de campo', 'Chalet', 5, 'Chalet de campo', 350, 'Extremadura', 'Foto Cover'),
        ('Elena', 'Piso en playa', 'Piso', 3, 'Piso cerca de la playa', 350, 'Galicia', 'Foto Cover'),
        ('Selene', 'Casa rural', 'Casa', 5, 'Casa rural', 350, 'Madrid', 'Foto Cover'),
        ('Selene', 'Chalet de campo', 'Chalet', 3, 'Chalet de campo', 350, 'Murcia', 'Foto Cover'),
        ('Esteban', 'Apartamento rural', 'Apartamento', 9, 'Apartamento rural', 350, 'Navarra', 'Foto Cover'),
        ('Esteban', 'Piso en playa', 'Piso', 6, 'Piso cerca de la playa', 350, 'Pais Vasco', 'Foto Cover'),
        ('Maria', 'Casa rural', 'Casa', 6, 'Casa rural', 350, 'Rioja', 'Foto Cover'),
        ('Maria', 'Apartamento rural', 'Apartamento', 3, 'Apartamento rural', 350, 'Ceuta', 'Foto Cover'),
        ('Susana', 'Casa rural', 'Casa', 2, 'Casa rural', 350, 'Melilla', 'Foto Cover'),
        ('Susana', 'Apartamento rural', 'Apartamento', 1, 'Apartamento rural', 350, 'Galicia', 'Foto Cover')
      `
    );
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release;
    process.exit();
  }
};

populate();
