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
        ('Toni','toni.rondan17@gmail.com','${hashedPass}', 1),
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
        ('Manu', 'Piso en playa', 'Piso', 4, 'Piso cerca de la playa', 350, 'Andalucia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Manu', 'Chalet de campo', 'Chalet', 3, 'Chalet de campo', 350, 'Aragon', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Oscar', 'Piso en playa', 'Piso', 2, 'Piso cerca de la playa', 350, 'Asturias', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Oscar', 'Casa rural', 'Casa', 7, 'Casa rural', 350, 'Balears', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Yese', 'Chalet de campo', 'Chalet', 2, 'Chalet de campo', 350, 'Canarias', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Yese', 'Piso en playa', 'Piso', 5, 'Piso cerca de la playa', 350, 'Cantabria', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Toni', 'Apartamento rural', 'Apartamento', 7, 'Apartamento rural', 350, 'Castilla y Leon', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Toni', 'Chalet de campo', 'Chalet', 3, 'Chalet de campo', 350, 'Castilla La Mancha', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Paco', 'Piso en playa', 'Piso', 1, 'Piso cerca de la playa', 350, 'Cataluña', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Paco', 'Casa rural', 'Casa', 8, 'Casa rural', 350, 'Comunidad Valenciana', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Elena', 'Chalet de campo', 'Chalet', 5, 'Chalet de campo', 350, 'Extremadura', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Elena', 'Piso en playa', 'Piso', 3, 'Piso cerca de la playa', 350, 'Galicia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Selene', 'Casa rural', 'Casa', 5, 'Casa rural', 350, 'Madrid', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Selene', 'Chalet de campo', 'Chalet', 3, 'Chalet de campo', 350, 'Murcia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Esteban', 'Apartamento rural', 'Apartamento', 9, 'Apartamento rural', 350, 'Navarra', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Esteban', 'Piso en playa', 'Piso', 6, 'Piso cerca de la playa', 350, 'Pais Vasco', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Maria', 'Casa rural', 'Casa', 6, 'Casa rural', 350, 'Rioja', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Maria', 'Apartamento rural', 'Apartamento', 3, 'Apartamento rural', 350, 'Ceuta', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Susana', 'Casa rural', 'Casa', 2, 'Casa rural', 350, 'Melilla', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Susana', 'Apartamento rural', 'Apartamento', 1, 'Apartamento rural', 350, 'Galicia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg')
      `
    );

    console.log('Rellenando tabla rentals');
    await connection.query(
      `
        INSERT INTO rentals (rental_rent_id, rental_owner, rental_tenant, rental_start, rental_end, rental_status)
        VALUES 
        (1, 'Manu', 'Susana', '2024-01-11', '2024-01-18', 'Pendiente'),
        (2, 'Manu', 'Maria', '2024-02-12', '2024-02-19', 'Aceptado'),
        (3, 'Oscar', 'Yese', '2024-03-13', '2024-03-20', 'Aceptado'),
        (4, 'Oscar', 'Selene', '2024-04-14', '2024-04-21', 'Rechazado'),
        (5, 'Yese', 'Esteban', '2024-05-15', '2024-05-22', 'Aceptado'),
        (6, 'Yese', 'Manu', '2024-06-16', '2024-06-23', 'Pendiente'),
        (7, 'Toni', 'Oscar', '2024-07-17', '2024-07-24', 'Aceptado'),
        (8, 'Toni', 'Paco', '2024-08-18', '2024-08-25', 'Rechazado'),
        (9, 'Selene', 'Toni', '2024-09-19', '2024-09-26', 'Pendiente'),
        (10, 'Selene', 'Elena', '2024-10-20', '2024-10-27', 'Pendiente')
      `
    );

    console.log('Rellenando tabla ravorites');
    await connection.query(
      `
        INSERT INTO favorites (user_id, rent_id)
        VALUES 
        ('Manu', 3),('Oscar', 5),('Yese', 7),('Toni', 9)
      `
    );

    console.log('Rellenando tabla rent_images');
    await connection.query(
      `
        INSERT INTO rent_images (rent_id, rent_image)
        VALUES 
        (1, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (1, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (2, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (2, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (3, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (3, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (4, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (4, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (5, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (5, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (6, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (6, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (7, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (7, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (8, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (8, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (9, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (9, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (10, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (10, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (11, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (12, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (13, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (13, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (14, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (14, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (15, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (15, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (16, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (16, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (17, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (17, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (18, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (18, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (19, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (19, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (20, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png'),
        (20, 'https://www.nottingham.ac.uk/Creative-energy-homes/images-multimedia/EONHouseMain.png')
      `
    );

    console.log('Rellenando tabla owner_ratings');
    await connection.query(
      `
        INSERT INTO owner_ratings (owner_id, renting_id, rating, comments)
        VALUES 
        ('Manu', 2, 5, 'Very nice people'),
        ('Oscar', 3, 5, 'Very nice people'),
        ('Yese', 5, 5, 'Very nice people'),
        ('Toni', 7, 5, 'Very nice people')
      `
    );

    console.log('Rellenando tabla tenant_ratings');
    await connection.query(
      `
        INSERT INTO tenant_ratings (tenant_id, renting_id, rating, comments)
        VALUES 
        ('Maria', 2, 5, 'Very nice people'),
        ('Yese', 3, 5, 'Very nice people'),
        ('Esteban', 5, 5, 'Very nice people'),
        ('Oscar', 7, 5, 'Very nice people')
      `
    );

    console.log('Rellenando tabla services');
    await connection.query(
      `
        INSERT INTO services (renting_id, elevator, hairdryer, ac, first_kit_aid, wifi, toaster, fully_equipped)
        VALUES 
        (1, 1, 1, 1, 1, 1, 1, 1),
        (2, 1, 1, 1, 1, 1, 1, 1),
        (3, 1, 1, 1, 1, 1, 1, 1),
        (4, 1, 1, 1, 1, 1, 1, 1),
        (5, 1, 1, 1, 1, 1, 1, 1),
        (6, 1, 1, 1, 1, 1, 1, 1),
        (7, 1, 1, 1, 1, 1, 1, 1),
        (8, 1, 1, 1, 1, 1, 1, 1),
        (9, 1, 1, 1, 1, 1, 1, 1),
        (10, 1, 1, 1, 1, 1, 1, 1),
        (11, 1, 1, 1, 1, 1, 1, 1),
        (12, 1, 1, 1, 1, 1, 1, 1),
        (13, 1, 1, 1, 1, 1, 1, 1),
        (14, 1, 1, 1, 1, 1, 1, 1),
        (15, 1, 1, 1, 1, 1, 1, 1),
        (16, 1, 1, 1, 1, 1, 1, 1),
        (17, 1, 1, 1, 1, 1, 1, 1),
        (18, 1, 1, 1, 1, 1, 1, 1),
        (19, 1, 1, 1, 1, 1, 1, 1),
        (20, 1, 1, 1, 1, 1, 1, 1)
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
