require('dotenv').config();
const getDB = require('./getDB.js');

const init = async () => {
  let connection;

  try {
    connection = await getDB();

    await connection.query(
      `DROP DATABASE IF EXISTS ${process.env.MYSQL_DATABASE}`
    );
    await connection.query(`CREATE DATABASE ${process.env.MYSQL_DATABASE}`);
    await connection.query(`USE ${process.env.MYSQL_DATABASE}`);

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
      createdAt DATETIME DEFAULT NOW(),
      modifiedAt DATETIME,
      registrationCode VARCHAR(100),
      resetPassCode VARCHAR(100),
      role ENUM('admin','user') DEFAULT 'user'	
    );
    `);

    console.log('Creando tabla rentings');
    await connection.query(`
    CREATE TABLE IF NOT EXISTS rentings(
      rent_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
      rent_owner VARCHAR(20) NOT NULL,
      rent_title VARCHAR(100) NOT NULL,
      rent_type ENUM('Chalet','Piso','Casa','Apartamento') NOT NULL,
      rent_rooms TINYINT UNSIGNED NOT NULL,
      rent_description VARCHAR(255) NOT NULL,
      rent_price INT UNSIGNED NOT NULL,
      rent_location ENUM('Andalucia', 'Aragon', 'Asturias', 'Balears', 'Canarias', 'Cantabria','Castilla y Leon', 'Castilla La Mancha', 'Cataluña', 'Comunidad Valenciana', 'Extremadura', 'Galicia', 'Madrid', 'Murcia', 'Navarra', 'Pais Vasco', 'Rioja', 'Ceuta', 'Melilla') NOT NULL, 
      rent_address VARCHAR(255) NOT NULL,
      rent_cover VARCHAR(255),
      active BOOLEAN DEFAULT true,
      createdAt DATETIME DEFAULT NOW(),
      FOREIGN KEY (rent_owner) REFERENCES users(username)
    );
    `);

    console.log('Creando tabla rentals');
    await connection.query(`
    CREATE TABLE IF NOT EXISTS rentals(
      rental_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      rental_rent_id INT UNSIGNED NOT NULL,
      rental_owner VARCHAR(20) NOT NULL,
      rental_tenant VARCHAR(20) NOT NULL,
      rental_start DATETIME NOT NULL,
      rental_end DATETIME NOT NULL,
      rental_status ENUM('Aceptado', 'Rechazado', 'Pendiente') DEFAULT 'Pendiente',
      FOREIGN KEY (rental_rent_id) REFERENCES rentings(rent_id),
      FOREIGN KEY (rental_owner) REFERENCES users(username),
      FOREIGN KEY (rental_tenant) REFERENCES users(username)
    );
    `);

    console.log('Creando tabla rent_images');
    await connection.query(`
    CREATE TABLE IF NOT EXISTS rent_images(
      rent_image_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      rent_id INT UNSIGNED NOT NULL,
      rent_image VARCHAR(255),
      createdAt DATETIME NOT NULL DEFAULT NOW(),
      FOREIGN KEY (rent_id) REFERENCES rentings(rent_id)
    );
    `);

    console.log('Creando tabla owner_ratings');
    await connection.query(`
    CREATE TABLE IF NOT EXISTS owner_ratings(
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

    console.log('Creando tabla tenant_ratings');
    await connection.query(`
    CREATE TABLE IF NOT EXISTS tenant_ratings(
      rating_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      tenant_id VARCHAR(20) NOT NULL,
      owner_id VARCHAR(20) NOT NULL,
      renting_id INT UNSIGNED NOT NULL,
      rating INT UNSIGNED NOT NULL,
      comments VARCHAR(200) NOT NULL,
      createdAt DATETIME NOT NULL DEFAULT NOW(),
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
