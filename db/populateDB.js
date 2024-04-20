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
        ('Manu','konstantinoff080696@gmail.com','${hashedPass}', 1),
        ('Oscar','negociominimoviable@gmail.com','${hashedPass}', 1),
        ('Yese','yese.astarloa@email.com','${hashedPass}', 1),
        ('Toni','antoniorondanvlc@gmail.com','${hashedPass}', 1),
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
        INSERT INTO rentings (rent_owner, rent_title, rent_type, rent_rooms, rent_description, rent_price, rent_location, rent_address, rent_cover)
        VALUES 
        ('Manu', 'Piso en playa', 'Piso', 4, 'Piso cerca de la playa', 350, 'Andalucia', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'http://localhost:3000/uploads/rent_images/cdade9bc-f3e7-4b5d-8eb3-0a639d4f0ae0.jpeg'),
        ('Manu', 'Chalet de campo', 'Chalet', 3, 'Chalet de campo', 350, 'Aragon', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'http://localhost:3000/uploads/rent_images/88b757bc-58cc-4dcb-8f4c-1c4e25cb3492.jpeg'),
        ('Oscar', 'Piso en playa', 'Piso', 2, 'Piso cerca de la playa', 350, 'Asturias', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'http://localhost:3000/uploads/rent_images/4237e539-a9da-432e-9960-f897344fc6fc.jpeg'),
        ('Oscar', 'Casa rural', 'Casa', 7, 'Casa rural', 350, 'Balears', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'http://localhost:3000/uploads/rent_images/7997c201-e226-490b-81cc-84d4694d5705.jpeg'),
        ('Yese', 'Chalet de campo', 'Chalet', 2, 'Chalet de campo', 350, 'Canarias', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Yese', 'Piso en playa', 'Piso', 5, 'Piso cerca de la playa', 350, 'Cantabria', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Toni', 'Apartamento rural', 'Apartamento', 7, 'Apartamento rural', 350, 'Castilla y Leon', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Toni', 'Chalet de campo', 'Chalet', 3, 'Chalet de campo', 350, 'Castilla La Mancha', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Paco', 'Piso en playa', 'Piso', 1, 'Piso cerca de la playa', 350, 'Cataluña', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Paco', 'Casa rural', 'Casa', 8, 'Casa rural', 350, 'Comunidad Valenciana', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Elena', 'Chalet de campo', 'Chalet', 5, 'Chalet de campo', 350, 'Extremadura', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Elena', 'Piso en playa', 'Piso', 3, 'Piso cerca de la playa', 350, 'Galicia', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Selene', 'Casa rural', 'Casa', 5, 'Casa rural', 350, 'Madrid', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Selene', 'Chalet de campo', 'Chalet', 3, 'Chalet de campo', 350, 'Murcia', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Esteban', 'Apartamento rural', 'Apartamento', 9, 'Apartamento rural', 350, 'Navarra', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Esteban', 'Piso en playa', 'Piso', 6, 'Piso cerca de la playa', 350, 'Pais Vasco', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Maria', 'Casa rural', 'Casa', 6, 'Casa rural', 350, 'Rioja', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Maria', 'Apartamento rural', 'Apartamento', 3, 'Apartamento rural', 350, 'Ceuta', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Susana', 'Casa rural', 'Casa', 2, 'Casa rural', 350, 'Melilla', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg'),
        ('Susana', 'Apartamento rural', 'Apartamento', 1, 'Apartamento rural', 350, 'Galicia', 'Calle Inventada 32, Piso 3 Puerta 4, 42069, Inventilandia', 'https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg')
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

    console.log('Rellenando tabla rent_images');
    await connection.query(
      `
        INSERT INTO rent_images (rent_id, rent_image)
        VALUES 
        (1, 'http://localhost:3000/uploads/rent_images/455994e5-7a26-4ea4-bead-2dea98cd90c3.jpeg'),
        (1, 'http://localhost:3000/uploads/rent_images/fb3d8ce3-6457-4452-8119-62fe99ca506e.jpeg'),
        (1, 'http://localhost:3000/uploads/rent_images/8a36d190-4aad-47dc-bffb-b124efb67f56.jpeg'),
        (1, 'http://localhost:3000/uploads/rent_images/9e2bd8c1-388a-4122-a443-0eec47b58169.jpeg'),
        (1, 'http://localhost:3000/uploads/rent_images/4d0d78f8-a0ca-4cd5-92ef-b54eb8ef0451.jpeg'),
        (2, 'http://localhost:3000/uploads/rent_images/6ca9d888-397e-4e8a-981d-087b067270bd.jpeg'),
        (2, 'http://localhost:3000/uploads/rent_images/f76cf022-bea3-4e23-a3df-b47949cff242.jpeg'),
        (2, 'http://localhost:3000/uploads/rent_images/189249c7-4b7b-46fc-b7d4-6af28557654b.jpeg'),
        (2, 'http://localhost:3000/uploads/rent_images/a83d7620-5595-4251-9d12-128bd1a51b0c.jpeg'),
        (2, 'http://localhost:3000/uploads/rent_images/357b4c31-4184-47df-b6ea-399aab00e2d7.jpeg'),
        (3, 'http://localhost:3000/uploads/rent_images/168d1c50-f899-4a02-9267-c088d4e4ec2f.jpeg'),
        (3, 'http://localhost:3000/uploads/rent_images/bb9df47c-a9d8-4af1-8dd7-bc3688c53721.jpeg'),
        (3, 'http://localhost:3000/uploads/rent_images/8572081c-f56f-46c2-8423-8671949d2d70.jpeg'),
        (3, 'http://localhost:3000/uploads/rent_images/7f232031-5fac-4517-8755-edecc1f87df9.jpeg'),
        (3, 'http://localhost:3000/uploads/rent_images/c6402626-292a-48c8-a77e-b46f09c34210.jpeg'),
        (3, 'http://localhost:3000/uploads/rent_images/59a9ff90-6a06-4b13-902b-ebb7c7765cc3.jpeg'),
        (3, 'http://localhost:3000/uploads/rent_images/61384013-6193-4159-b38c-57ce1dcc9f0e.jpeg'),
        (4, 'http://localhost:3000/uploads/rent_images/b465c0f0-7f09-482d-8ee7-ae610588d17f.jpeg'),
        (4, 'http://localhost:3000/uploads/rent_images/645b2906-0dcf-4e3f-a51a-31e9d0f96e12.jpeg'),
        (4, 'http://localhost:3000/uploads/rent_images/baba3829-f035-4426-882d-6558bd822b96.jpeg'),
        (4, 'http://localhost:3000/uploads/rent_images/4c4b47c9-08c6-4713-a8b8-e10e62e99a8a.jpeg'),
        (4, 'http://localhost:3000/uploads/rent_images/e5380046-c60a-415d-8bf6-0f6c631f3671.jpeg'),
        (4, 'http://localhost:3000/uploads/rent_images/26c3a405-2f0a-4cb1-b06c-f44e5156dfee.jpeg'),
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
