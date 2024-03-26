/* borramos la base de datos en caso exista para hacer las pruebas */
DROP DATABASE IF EXISTS huellitas;

/* creamos la base de datos */
CREATE DATABASE huellitas;

/* Definimos la base de datos en la cual vamos a crear las tablas  */
USE huellitas;

/* CREACION DE LA TABLA de categoría de usuarios (administrador, cliente) */
CREATE TABLE users_categories (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(20) NOT NULL
);

/* CREACION DE LA TABLA de usuarios que se registran en el sistema */
CREATE TABLE users (
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(25) NOT NULL,
 apellido VARCHAR(25) NOT NULL,
 email  VARCHAR(40) NOT NULL,
 contrasenia VARCHAR(100) NOT NULL,
 direccion VARCHAR(40) NOT NULL,
 telefono BIGINT NULL,
 imagen VARCHAR(25) NOT NULL,
 id_categoria INT NOT NULL,
 activo TINYINT NOT NULL,
 
 FOREIGN KEY (id_categoria) REFERENCES users_categories(id)
);

/* CREACION DE LA TABLA de mascotas (perros, gatos) */
CREATE TABLE pets (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	mascota VARCHAR(25) NOT NULL
);

/* CREACION DE LA TABLA de las marcas de productos */
CREATE TABLE brands (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre_marca VARCHAR(25) NOT NULL
);

/* CREACION DE LA TABLA de la edad de la mascota */
CREATE TABLE pets_ages (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	edad VARCHAR(15) NOT NULL
);

/* CREACION DE LA TABLA de tamaño de mascota */
CREATE TABLE pets_sizes (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	tamanio VARCHAR(15) NOT NULL
);

/* CREACION DE LA TABLA de categoría de productos*/
CREATE TABLE products_categories (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(25) NOT NULL
);

/* CREACION DE LA TABLA de subcategorías */
CREATE TABLE products_sub_categories (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_category INT NOT NULL, 
	nombre_sub_category VARCHAR(25) NOT NULL,
    
    FOREIGN KEY (id_category) REFERENCES products_categories(id)
);

/* CREACION DE LA TABLA para definir el tamaño de los paquetes */
CREATE TABLE packages_sizes (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_category INT NULL, 
	cantidad DECIMAL(5,2) NOT NULL,
    unidad_medida varchar(10) NOT NULL,
    
    FOREIGN KEY (id_category) REFERENCES products_categories(id)
);

/* CREACION DE LA TABLA productos */
CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(7,2) NOT NULL,
    descuento INT NULL, 
    id_mascota INT NOT NULL,
    imagen VARCHAR(100) NOT NULL,
    id_marca INT NOT NULL,
    id_edad_mascota INT NOT NULL, 
    id_tamanio_mascota INT NOT NULL,
    destacado TINYINT NOT NULL,
    id_categoria INT NOT NULL,
    id_sub_categoria INT NULL, 
    id_presentacion INT NULL,
    stock INT NOT NULL,
    activo_prod TINYINT NOT NULL,
    
    FOREIGN KEY (id_mascota) REFERENCES pets(id),
    FOREIGN KEY (id_marca) REFERENCES brands(id),
    FOREIGN KEY (id_edad_mascota) REFERENCES pets_ages(id),
    FOREIGN KEY (id_tamanio_mascota) REFERENCES pets_sizes(id),
    FOREIGN KEY (id_categoria) REFERENCES products_categories(id),
    FOREIGN KEY (id_sub_categoria) REFERENCES products_sub_categories(id),
    FOREIGN KEY (id_presentacion) REFERENCES packages_sizes(id)
);

/* CREACION DE LA TABLA carrito de compras */
CREATE TABLE shopping_carts (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    cantidad_productos INT NOT NULL,
    monto_total DECIMAL(8,2) NOT NULL,
    fecha DATETIME NOT NULL,
    
    FOREIGN KEY (id_cliente) REFERENCES users (id)
);

/* CREACION DE LA TABLA productos del carrito */
CREATE TABLE carts_products (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_shopping_cart INT NOT NULL,
    id_product INT NOT NULL,
    precio DECIMAL(7,2) NOT NULL,
    cantidad INT NOT NULL,
    descuento INT NULL,
    
    FOREIGN KEY (id_shopping_cart) REFERENCES shopping_carts (id),
    FOREIGN KEY (id_product) REFERENCES products (id)
);