DROP DATABASE IF EXISTS subrealista;
CREATE DATABASE IF NOT EXISTS subrealista;
USE subrealista;

CREATE TABLE IF NOT EXISTS users(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    profilePic VARCHAR(255), 
    bio VARCHAR(255), 
    address VARCHAR(100),
    active BOOLEAN DEFAULT false,
    createdAt DATETIME NOT NULL DEFAULT NOW(),
    modifiedAt DATETIME,
    role ENUM('admin','user') DEFAULT 'user'	
);

CREATE TABLE IF NOT EXISTS rentings(
	rent_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
    rent_owner INT UNSIGNED NOT NULL,
    rent_tenant INT UNSIGNED NOT NULL,
    rent_title VARCHAR(100) NOT NULL,
    rent_type ENUM('Chalet','Piso','Casa','Apartamento') NOT NULL,
    rent_description VARCHAR(255) NOT NULL,
    rent_price INT UNSIGNED NOT NULL,
    rent_location ENUM('Andalucía', 'Aragón', 'Asturias', 'Balears', 'Canarias', 'Cantabria','Castilla y León', 'Castilla - La Mancha', 'Catalunya', 'Comunitat Valenciana', 'Extremadura', 'Galicia', 'Madrid', 'Murcia', 'Navarra', 'País Vasco', 'Rioja', 'Ceuta', 'Melilla') NOT NULL, 
    createdAt DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (rent_owner) REFERENCES users(id),
    FOREIGN KEY (rent_tenant) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS favorites(
	favorites_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED NOT NULL,
    rent_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (rent_id) REFERENCES rentings(rent_id)
);

CREATE TABLE IF NOT EXISTS rent_images(
	rent_image_id INT UNSIGNED PRIMARY KEY,
    rent_id INT UNSIGNED NOT NULL,
    rent_image VARCHAR(255),
	createdAt DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (rent_id) REFERENCES rentings(rent_id)
);

CREATE TABLE IF NOT EXISTS rent_dates(
	rent_date_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    rent_id INT UNSIGNED NOT NULL,
    rent_startDate DATETIME NOT NULL,
    rent_endDate DATETIME NOT NULL,
    FOREIGN KEY (rent_id) REFERENCES rentings(rent_id)
);

CREATE TABLE IF NOT EXISTS ratings(
	rating_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    owner_id INT UNSIGNED NOT NULL,
    tenant_id INT UNSIGNED NOT NULL,
    renting_id INT UNSIGNED NOT NULL,
    rating INT UNSIGNED NOT NULL,
    comments VARCHAR(200) NOT NULL,
	createdAt DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (owner_id) REFERENCES users(id),
    FOREIGN KEY (tenant_id) REFERENCES users(id),
    FOREIGN KEY (renting_id) REFERENCES rentings(rent_id)
);

/* TABLAS DE SERVICIOS*/