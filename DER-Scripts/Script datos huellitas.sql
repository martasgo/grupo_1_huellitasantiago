USE huellitas;

/* COMPLETAR LA TABLA pets */
INSERT INTO pets
VALUES 
(1, 'Perros'),
(2, 'Gatos'),
(3, 'Perros-Gatos');

SELECT * FROM pets;

/* COMPLETAR LA TABLA brands */
INSERT INTO brands
VALUES
(1, 'Pedrigree'),
(2, 'Royal Canin'),
(3, 'Sieger'),
(4, 'Nutrique'),
(5, 'Purina'),
(6, 'Vitalcan'),
(7, 'Absorsol'),
(8, 'Puppis'),
(9, 'Canine Couture'),
(10, 'Garritas'),
(11, 'Oasis'),
(12, 'Forte Health'),
(13, 'Pauldip'),
(14, 'La Tienda'),
(15, 'Bacan'),
(16, 'Animal Pet'),
(17, 'Frontline'),
(18, 'Earth Rated');

SELECT * FROM brands;

/* COMPLETAR TABLA DE pets_ages */
INSERT INTO pets_ages
VALUES
(1, 'Cachorro'),
(2, 'Adulto');

SELECT * FROM pets_ages;

/* COMPLETAR LA TABLA DE pets_sizes */
INSERT INTO pets_sizes
VALUES
(1, 'Peque�o'),
(2, 'Mediano'),
(3, 'Grande');

SELECT * FROM pets_sizes;

/* COMPLETAR LA TABLA products_categories */
INSERT INTO products_categories
VALUES
(1, 'Alimentos'),
(2, 'Accesorios'),
(3, 'Cuidado e Higiene'),
(4, 'Ropa');

SELECT * FROM products_categories;

/* COMPLETAR LA TABLA users_categories */
INSERT INTO users_categories
VALUES
(1, 'Administrador'),
(2, 'Cliente');

SELECT * FROM users_categories;

/* COMPLETAR LA TABLA products_sub_categories */
INSERT INTO products_sub_categories
VALUES
(1, 1, 'Alimentos secos'),
(2, 1, 'Latas y sobres'),
(3, 1, 'Alimento natural')
(4, 2, 'Fundas para auto'),
(5, 2, 'Camas'),
(6, 2, 'Correas'),
(7, 2, 'Comederos y bebederos'),
(8, 2, 'Dispensers'),
(9, 2, 'Transportadoras'),
(10, 2, 'Varios');

SELECT * FROM products_sub_categories;

/* COMPLETAR LA TABLA packages_sizes */
INSERT INTO packages_sizes
VALUES
(1, 1, 85.00, 'Grs'),
(2, 1, 100.00, 'Grs'),
(3, 1, 500.00, 'Grs'),
(4, 1, 1.00, 'Kg'),
(5, 1, 2.50, 'Kg'),
(6, 1, 3.00, 'Kg');

SELECT * FROM packages_sizes;

/* COMPLETAR LA TABLA users */
INSERT INTO users
VALUES
(1, 'Marta', 'Abutti', 'mabutti@gmail.com', '$2a$10$Q/N.y/cCTGDASVe7jXlfXuQXL6R/bACboukDdSjHsHyv3./BSxfAy', 'Av. Alsina 1234', 3854167526, 'avatar-martita.png', 1),
(2, 'Soledad', 'Smith', 'fernanda.smith.ss@gmail.com', '$2a$10$BWWIFCWKd7gxA57X1p2gK.efMlI2sfEqtDWYl6i5zbuOoIN2HY2Ei', 'Av. Belgrano 5678', 3854860777, 'avatar-sole.png', 2),
(3, 'Mario', 'Pereyra', 'mariopereyra1.mpp@gmail.com', '$2a$10$f0kwB45GE8kVdI.W6gIvqOKE.wIxSM.XsIEpdRBIajG3AX/ZWVrvu', 'Jujuy 2244', 3855884040, 'avatar-marito.png', 2),
(4, 'Matias', 'Gomez', 'cpnmatiasgomez@gmail.com', '$2a$10$jmeHLz.wcBHKov6WxHPbmORHs9tr5.Q8Dq9pfSCnoGYCY4qHZlyZC', 'Roca Sur 926', 3855806617, 'avatar-mati.png', 2),
(5, 'Gabriel', 'Dominguez', 'gabidominguez@gmail.com', '$2a$10$UDKihaU/PuTghnDEboD1oOeIpOpJm3cSpu1YZqENJ.1l9bYQEDOve', 'Salta 5467', 3854677665, 'avatar-gabi.png', 2),
(6, 'Chino', 'de China', 'chinodechina@gmail.com', '$2a$10$4Ko0.BNbLTMdtTUfF0wISuZA516yDO.hOt5AFrRJqIYHkBj2MGfEW', 'Rivadavia 345', 3855231212, 'avatar-chino.png', 2);

SELECT * FROM users;

/* COMPLETAR LA TABLA producto */

INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock) VALUES ('8', 'Camisa De Verano', 'CAMISA DE VERANO TALLE 3. PARA PERROS O GATOS PEQUE�OS. LARGO: 32 CM', '4350', '0', '3', 'ropa/camisa-verano.png', '10', '1', '1', '0', '4', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock) VALUES ('9', 'Vestido De Jean', 'VESTIDO DE JEAN TALLE 3. PARA PERROS O GATOS PEQUE�OS. LARGO: 32 CM. Material: algod�n.', '4200', '0', '3', 'ropa/vestido-jean.png', '10', '1', '1', '0', '4', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock) VALUES ('10', 'Poncho Abrigo', 'La prenda perfecta para que tu peludito est� protegido cuando haga fr�o, haya viento o llueva. Ideal para cachorritos. Ayudan a prevenir que tu mascota se resfr�e durante el invierno. Modelo de buzos en colores varios.', '4700', '10', '2', 'ropa/poncho-abrigo.png', '11', '2', '3', '0', '4', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock) VALUES ('11', 'Pipeta Frontline Plus Perros 60kg', 'FRONTLINE� Plus, proporciona una protecci�n continua, con doble acci�n, sobre pulgas adultas y sobre los estadios inmaduros (huevos y larvas) presentes en el medio ambiente. FRONTLINE� Plus tambi�n elimina las garrapatas y piojos.', '8950', '20', '1', 'cuidado-higiene/pipeta.png', '17', '2', '3', '1', '3', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock) VALUES ('12', 'Forte Health Antibiotico Natural', 'Antibi�ticos naturales para perros, apoya el alivio de la alergia del perro, multivitam�nico para perros, antibi�ticos para perros, antibi�ticos para mascotas, alivio de la picaz�n del perro, gotas para fortalecimiento general, para todas las razas y tama�os', '15200', '0', '1', 'cuidado-higiene/antibiotico.png', '12', '2', '2', '0', '3', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock) VALUES ('13', 'Absorsol Premium 1 Kg', 'Las Piedras Sanitarias Absorsol Premium, poseen m�ximo rendimiento con bajo mantenimiento. Su composici�n ecol�gica y reciclable, quita los olores de los excrementos, absorbe la cantidad de l�quido equivalente a su peso r�pidamente, y no desprende el l�quido absorbido.', '8500', '0', '2', 'cuidado-higiene/piedras-gato/absorsol.png', '7', '1', '2', '0', '3', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock) VALUES ('14', 'Pauldip Ba�o de espuma seca', 'Ideal para la higiene y belleza, especialmente para �pocas de fr�o ya que no hace falta mojarlos. Shampoo en espuma seca, biologicamente activo para perros y gatos de todas las edades. Da brillo y suavidad. Aplicar sobre el cuerpo del animal y luego rotar firmemente hasta que la espuma desaparezca.', '3570', '0', '2', 'cuidado-higiene/espuma-enseco.jpg', '13', '2', '2', '0', '3', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock) VALUES ('15', 'Pedigree Denstastix X 7', 'Barra de cuidado oral diario que ayuda a prevenir enfermedades de las enc�as y mal aliento en los perros. Gracias a su forma exclusiva y combinaci�n de ingredientes activos, es una efectiva soluci�n para ayudar a mantener sus dientes limpios y enc�as saludables de forma f�cil y divertida.', '1080', '0', '1', 'cuidado-higiene/cuidado-oral.png', '1', '1', '2', '0', '3', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, stock) VALUES ('16', 'Cama alcolchadas', 'Agradable camita acolchonada', '15000', '0', '3', 'accesorios/camas/cama.png', '14', '2', '2', '0', '2', '5', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, stock) VALUES ('17', 'Collares', 'collar para tu gatito', '3000', '10', '2', 'accesorios/collares/collares.png', '14', '1', '1', '0', '2', '6', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, stock) VALUES ('18', 'Comedero bebedero', 'comederos y bebederos para tus mascotas', '6000', '10', '3', 'accesorios/comederos/par-blanco-letras.png', '8', '1', '1', '0', '2', '7', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, stock) VALUES ('19', 'Funda para auto', 'fundita para llevar a tus perros en el vehiculo', '13000', '10', '1', 'accesorios/varios/funda-auto.png', '15', '2', '2', '1', '2', '4', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, stock) VALUES ('20', 'Rascador para gato', 'Excelente rascador para gatos', '8000', '0', '2', 'accesorios/varios/rascador-gato.png', '16', '2', '2', '0', '2', '10', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, stock) VALUES ('21', 'Dispenser bolsa biodegradable', 'dispenser para llevar tus bolsitas cuando saques a pasear a tus mascotas', '9000', '0', '1', 'accesorios/varios/dispenser-bolsas-biodegradables.png', '18', '2', '2', '0', '2', '10', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, id_presentacion, stock) VALUES ('1', 'Bifecitos de pollo para perros', 'Bifecitos sabor pollo en salsa para razas peque�as de perros adultos.', '500', '0', '1', 'alimentos/pedigree-pouch-adulto.png', '1', '2', '1', '1', '1', '2', '2', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, id_presentacion, stock) VALUES ('2', 'Regular fit feline', 'Alimento seco de alta nutrici�n para gatos adultos.', '7500', '0', '2', 'alimentos/royal-canin-gato-fit.png', '2', '2', '2', '0', '1', '1', '5', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, id_presentacion, stock) VALUES ('3', 'Nutrique perros adultos', 'Alimento seco sabor pavo para perros adultos de razas grandes.', '10000', '0', '1', 'alimentos/nutrique-perro-adulto.png', '4', '2', '3', '0', '1', '1', '5', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, id_presentacion, stock) VALUES ('4', 'Bifecitos de pollo para gatos', 'Alimento blando sabor pollo de alta nutrici�n para gatitos beb�s.', '600', '0', '2', 'alimentos/gatitos-sobre-purina.png', '5', '1', '1', '0', '1', '2', '2', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, id_presentacion, stock) VALUES ('5', 'Complete perros cachorros', 'Alimento seco para perros cachorros de razas peque�as.', '8000', '0', '1', 'alimentos/vitalcan-perro-cachorro.png', '6', '1', '1', '0', '1', '1', '5', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock) VALUES ('6', 'Bandana Puppis Halloween Calabaza', 'La Bandana Puppis Halloween Calabaza es el accesorio perfecto para que tu mascota se una a la diversi�n de la temporada, agregando un toque espeluznante y elegante. Fabricada con microfibra de alta calidad, estas bandanas son suaves al tacto y c�modas para que tu mascota se sienta a gusto.', '4000', '0', '1', 'ropa/bandana-puppis-halloween.png', '8', '1', '2', '0', '4', '10');
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock) VALUES ('7', 'Camiseta Argentina Mundial', 'Camiseta deportiva para tu perrito futbolero.', '6500', '0', '1', 'ropa/camiseta-argentina-mundial.png', '9', '2', '2', '1', '4', '10');