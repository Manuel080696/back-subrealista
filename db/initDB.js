require('dotenv').config();

const getDB = require('./getDB.js');

const init = async () => {
  let connection;

  try {
    connection = await getDB();

    await connection.query('DROP DATABASE IF EXISTS subrealista;');
    await connection.query('CREATE DATABASE IF NOT EXISTS subrealista;');
    await connection.query('USE subrealista;');

    console.log('Creando tablas');
    console.log('Creando tabla users');
    await connection.query(`
    CREATE TABLE IF NOT EXISTS users(
      username VARCHAR(20) PRIMARY KEY UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      profilePic VARCHAR(255), 
      bio VARCHAR(255), 
      address VARCHAR(100),
      active BOOLEAN DEFAULT false,
      createdAt DATETIME NOT NULL DEFAULT NOW(),
      modifiedAt DATETIME,
      registrationCode VARCHAR(100),
      role ENUM('admin','user') DEFAULT 'user'	
    );
    `);

    console.log('Creando tabla rentings');
    await connection.query(`
    CREATE TABLE IF NOT EXISTS rentings(
      rent_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
      rent_owner VARCHAR(20) NOT NULL,
      rent_tenant VARCHAR(20),
      rent_title VARCHAR(100) NOT NULL,
      rent_type ENUM('Chalet','Piso','Casa','Apartamento') NOT NULL,
      rent_description VARCHAR(255) NOT NULL,
      rent_price INT UNSIGNED NOT NULL,
      rent_location ENUM('Andalucía', 'Aragón', 'Asturias', 'Balears', 'Canarias', 'Cantabria','Castilla y León', 'Castilla - La Mancha', 'Catalunya', 'Comunitat Valenciana', 'Extremadura', 'Galicia', 'Madrid', 'Murcia', 'Navarra', 'País Vasco', 'Rioja', 'Ceuta', 'Melilla') NOT NULL, 
      createdAt DATETIME NOT NULL DEFAULT NOW(),
      FOREIGN KEY (rent_owner) REFERENCES users(username),
      FOREIGN KEY (rent_tenant) REFERENCES users(username)
    );
    `);

    console.log('Creando tabla favorites');
    await connection.query(`
    CREATE TABLE IF NOT EXISTS favorites(
      favorites_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      user_id VARCHAR(20) NOT NULL,
      rent_id INT UNSIGNED NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(username),
      FOREIGN KEY (rent_id) REFERENCES rentings(rent_id)
    );
    `);

    console.log('Creando tabla rent_images');
    await connection.query(`
    CREATE TABLE IF NOT EXISTS rent_images(
      rent_image_id INT UNSIGNED PRIMARY KEY,
      rent_id INT UNSIGNED NOT NULL,
      rent_image VARCHAR(255),
      createdAt DATETIME NOT NULL DEFAULT NOW(),
      FOREIGN KEY (rent_id) REFERENCES rentings(rent_id)
    );
    `);

    console.log('Creando tabla rent_dates');
    await connection.query(`
    CREATE TABLE IF NOT EXISTS rent_dates(
      rent_date_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      rent_id INT UNSIGNED NOT NULL,
      rent_startDate DATETIME NOT NULL,
      rent_endDate DATETIME NOT NULL,
      FOREIGN KEY (rent_id) REFERENCES rentings(rent_id)
    );
    `);

    console.log('Creando tabla ratings');
    await connection.query(`
    CREATE TABLE IF NOT EXISTS ratings(
      rating_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      owner_id VARCHAR(20) NOT NULL,
      tenant_id VARCHAR(20) NOT NULL,
      renting_id INT UNSIGNED NOT NULL,
      rating INT UNSIGNED NOT NULL,
      comments VARCHAR(200) NOT NULL,
      createdAt DATETIME NOT NULL DEFAULT NOW(),
      FOREIGN KEY (owner_id) REFERENCES users(username),
      FOREIGN KEY (tenant_id) REFERENCES users(username),
      FOREIGN KEY (renting_id) REFERENCES rentings(rent_id)
    );
    `);

    console.log('Creando tabla services');
    await connection.query(`
    CREATE TABLE IF NOT EXISTS services(
      rent_equipment_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      renting_id INT UNSIGNED NOT NULL,
      elevator BOOLEAN DEFAULT false,
      near_beach BOOLEAN DEFAULT false,
      near_mountain BOOLEAN DEFAULT false,
      hairdryer BOOLEAN DEFAULT false,
      washing_machine BOOLEAN DEFAULT false,
      ac BOOLEAN DEFAULT false,
      smoke_detector BOOLEAN DEFAULT false,
      first_kit_aid BOOLEAN DEFAULT false,
      wifi BOOLEAN DEFAULT false, 
      refrigerator BOOLEAN DEFAULT false,
      freezer BOOLEAN DEFAULT false,
      toaster BOOLEAN DEFAULT false, 
      fully_equipped BOOLEAN DEFAULT false,
      FOREIGN KEY (renting_id) REFERENCES rentings(rent_id)
    );
    `);

    console.log('Tablas creadas');
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release;
    process.exit();
  }
};

init();
