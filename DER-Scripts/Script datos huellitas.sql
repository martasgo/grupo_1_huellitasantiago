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
(1, 'Pequeño'),
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
(3, 1, 'Alimento natural'),
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
(1, 'Marta', 'Abutti', 'mabutti@gmail.com', '$2a$10$BeqZ7zAddKn1Mm3n7EBREuiFxD/fS2C8Q1NFaUbSRHfXU9sskzcx.', 'Av. Alsina 1234', 3854167526, 'avatar-martita.png', 1, 1),
(2, 'Soledad', 'Smith', 'fernanda.smith.ss@gmail.com', '$2a$10$g30UpKdArsP0QXLMvYrbxOIwhgAUC34ixEsqpk5.EaSwMSFccBhTG', 'Av. Belgrano 5678', 3854860777, 'avatar-sole.png', 2, 1),
(3, 'Mario', 'Pereyra', 'mariopereyra1.mpp@gmail.com', '$2a$10$g9GNeUarfp8HtS5hPfWDYeLec1ky0Ae517pkeqJUX55nNRG7W6Fzm', 'Jujuy 2244', 3855884040, 'avatar-marito.png', 2, 1),
(4, 'Matias', 'Gomez', 'cpnmatiasgomez@gmail.com', '$2a$10$cZDJvEK8C6SBuHdNawY9UeJekB6qlcxaoosLFEzIT5JHNbJK0S64.', 'Roca Sur 926', 3855806617, 'avatar-mati.png', 2, 1),
(5, 'Pedro', 'Zarsa', 'pedrozarza@gmail.com', '$2a$10$fJYgUkmkGFJLTx9gQSRWRuuDaKSNNIZrrMHAwwpu.Q2IDXsyyFjo.', 'Salta 5467', 3854677665, 'avatar-gabi.png', 2, 1),
(6, 'Chino', 'de China', 'chinodechina@gmail.com', '$2a$10$Xk2LKNn4rieANm4I6EbJL.WQnTeSMAU.sNevoTvvZiDeKCCb7bK86', 'Rivadavia 345', 3855231212, 'avatar-chino.png', 2, 1);

SELECT * FROM users;

/* COMPLETAR LA TABLA producto */
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, id_presentacion, stock, activo) VALUES (1, 'Bifecitos de pollo para perros', 'Bifecitos sabor pollo en salsa para razas pequeñas de perros adultos.', 500, 0, 1, 'alimentos/pedigree-pouch-adulto.png', 1, 2, 1, 1, 1, 2, 2, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, id_presentacion, stock, activo) VALUES (2, 'Regular fit feline', 'Alimento seco de alta nutrición para gatos adultos.', 7500, 0, 2, 'alimentos/royal-canin-gato-fit.png', 2, 2, 2, 0, 1, 1, 5, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, id_presentacion, stock, activo) VALUES (3, 'Nutrique perros adultos', 'Alimento seco sabor pavo para perros adultos de razas grandes.', 10000, 0, 1, 'alimentos/nutrique-perro-adulto.png', 4, 2, 3, 0, 1, 1, 5, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, id_presentacion, stock, activo) VALUES (4, 'Bifecitos de pollo para gatos', 'Alimento blando sabor pollo de alta nutrición para gatitos bebés.', 600, 0, 2, 'alimentos/gatitos-sobre-purina.png', 5, 1, 1, 0, 1, 2, 2, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, id_presentacion, stock, activo) VALUES (5, 'Complete perros cachorros', 'Alimento seco para perros cachorros de razas pequeñas.', 8000, 0, 1, 'alimentos/vitalcan-perro-cachorro.png', 6, 1, 1, 0, 1, 1, 5, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock, activo) VALUES (6, 'Bandana Puppis Halloween Calabaza', 'La Bandana Puppis Halloween Calabaza es el accesorio perfecto para que tu mascota se una a la diversión de la temporada, agregando un toque espeluznante y elegante. Fabricada con microfibra de alta calidad, estas bandanas son suaves al tacto y cómodas para que tu mascota se sienta a gusto.', 4000, 0, 1, 'ropa/bandana-puppis-halloween.png', 8, 1, 2, 0, 4, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock, activo) VALUES (7, 'Camiseta Argentina Mundial', 'Camiseta deportiva para tu perrito futbolero.', 6500, 0, 1, 'ropa/camiseta-argentina-mundial.png', 9, 2, 2, 1, 4, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock, activo) VALUES (8, 'Camisa De Verano', 'CAMISA DE VERANO TALLE 3. PARA PERROS O GATOS PEQUEÑOS. LARGO: 32 CM', 4350, 0, 3, 'ropa/camisa-verano.png', 10, 1, 1, 0, 4, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock, activo) VALUES (9, 'Vestido De Jean', 'VESTIDO DE JEAN TALLE 3. PARA PERROS O GATOS PEQUEÑOS. LARGO: 32 CM. Material: algodón.', 4200, 0, 3, 'ropa/vestido-jean.png', 10, 1, 1, 0, 4, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock, activo) VALUES (10, 'Poncho Abrigo', 'La prenda perfecta para que tu peludito esté protegido cuando haga frío, haya viento o llueva. Ideal para cachorritos. Ayudan a prevenir que tu mascota se resfríe durante el invierno. Modelo de buzos en colores varios.', 4700, 10, 2, 'ropa/poncho-abrigo.png', 11, 2, 3, 0, 4, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock, activo) VALUES (11, 'Pipeta Frontline Plus Perros 60kg', 'FRONTLINE® Plus, proporciona una protección continua, con doble acción, sobre pulgas adultas y sobre los estadios inmaduros (huevos y larvas) presentes en el medio ambiente. FRONTLINE® Plus también elimina las garrapatas y piojos.', 8950, 20, 1, 'cuidado-higiene/pipeta.png', 17, 2, 3, 1, 3, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock, activo) VALUES (12, 'Forte Health Antibiotico Natural', 'Antibióticos naturales para perros, apoya el alivio de la alergia del perro, multivitamínico para perros, antibióticos para perros, antibióticos para mascotas, alivio de la picazón del perro, gotas para fortalecimiento general, para todas las razas y tamaños.', 15200, 0, 1, 'cuidado-higiene/antibiotico.png', 12, 2, 2, 0, 3, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock, activo) VALUES (13, 'Absorsol Premium 1 Kg', 'Las Piedras Sanitarias Absorsol Premium, poseen máximo rendimiento con bajo mantenimiento. Su composición ecológica y reciclable, quita los olores de los excrementos, absorbe la cantidad de líquido equivalente a su peso rápidamente, y no desprende el líquido absorbido.', 8500, 0, 2, 'cuidado-higiene/piedras-gato/absorsol.png', 7, 1, 2, 0, 3, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock, activo) VALUES (14, 'Pauldip Baño de espuma seca', 'Ideal para la higiene y belleza, especialmente para épocas de frío ya que no hace falta mojarlos. Shampoo en espuma seca, biologicamente activo para perros y gatos de todas las edades. Da brillo y suavidad. Aplicar sobre el cuerpo del animal y luego rotar firmemente hasta que la espuma desaparezca.', 3570, 0, 2, 'cuidado-higiene/espuma-enseco.jpg', 13, 2, 2, 0, 3, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, stock, activo) VALUES (15, 'Pedigree Denstastix X 7', 'Barra de cuidado oral diario que ayuda a prevenir enfermedades de las encías y mal aliento en los perros. Gracias a su forma exclusiva y combinación de ingredientes activos, es una efectiva solución para ayudar a mantener sus dientes limpios y encías saludables de forma fácil y divertida.', 1080, 0, 1, 'cuidado-higiene/cuidado-oral.png', 1, 1, 2, 0, 3, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, stock, activo) VALUES (16, 'Cama alcolchadas', 'Agradable camita acolchonada.', 15000, 0, 3, 'accesorios/camas/cama.png', 14, 2, 2, 0, 2, 5, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, stock, activo) VALUES (17, 'Collares', 'collar para tu gatito', 3000, 25, 2, 'accesorios/collares/collares.png', 14, 1, 1, 0, 2, 6, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, stock, activo) VALUES (18, 'Comedero bebedero', 'comederos y bebederos para tus mascotas.', 6000, 25, 3, 'accesorios/comederos/par-blanco-letras.png', 8, 1, 1, 0, 2, 7, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, stock, activo) VALUES (19, 'Funda para auto', 'fundita para llevar a tus perros en el vehiculo.', 13000, 25, 1, 'accesorios/varios/funda-auto.png', 15, 2, 2, 1, 2, 4, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, stock, activo) VALUES (20, 'Rascador para gato', 'Excelente rascador para gatos.', 8000, 0, 2, 'accesorios/varios/rascador-gato.png', 16, 2, 2, 0, 2, 10, 10, 1);
INSERT INTO huellitas.products (id, nombre, descripcion, precio, descuento, id_mascota, imagen, id_marca, id_edad_mascota, id_tamanio_mascota, destacado, id_categoria, id_sub_categoria, stock, activo) VALUES (21, 'Dispenser bolsa biodegradable', 'dispenser para llevar tus bolsitas cuando saques a pasear a tus mascotas.', 9000, 0, 1, 'accesorios/varios/dispenser-bolsas-biodegradables.png', 18, 2, 2, 0, 2, 10, 10, 1);

/* COMPLETAR LA TABLA shopping_carts */
INSERT INTO shopping_carts
VALUES
(1, 2, 1, 4000.00, "2024-04-02 23:57:11"),
(2, 6, 2, 16050.00, "2024-04-04 19:46:30"),
(3, 4, 2, 24200.00, "2024-04-05 02:54:10"),
(4, 3, 1, 7160.00, "2024-04-05 02:59:56"),
(5, 5, 2, 6270.00, "2024-04-05 03:01:13");

SELECT * FROM shopping_carts;


/* COMPLETAR LA TABLA carts_products */
INSERT INTO carts_products
VALUES
(1, 1, 6, 4000.00, 1, 0),
(2, 2, 8, 4350.00, 1, 0),
(3, 2, 19, 13000.00, 1, 10),
(4, 3, 21, 9000.00, 1, 0),
(5, 3, 12, 15200.00, 1, 0),
(6, 4, 11, 8950.00, 1, 20),
(7, 5, 14, 3570.00, 1,0),
(8, 5, 17, 3000.00, 1, 10);

SELECT * FROM carts_products;
