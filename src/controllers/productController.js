const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname , "../data/products.json");

// Creo una función para leer el JSON de productos y devolver
// un array de esos mismos productos
function getProducts() {
	return JSON.parse(fs.readFileSync(productsFilePath , "utf-8"));
};



const prodController = {
    indexProductController: (req, res) => {
      res.render ('../views/mascotas.ejs', {
        title: 'Mascotas'
      });
    },
    detailProductController:(req, res) => {
        idProducto = parseInt(req.params.id);
        if (idProducto === 1 ){
            res.render('../views/products/detalle-producto.ejs', {
                /* aqui se mandaria le objeto de cada articulo para hacerlo dinámico */
                title: 'Detalle producto',
            });
        }
    },
    //ruta para crear prod
    crearProdController:(req, res) => {
      res.render('../views/products/crear.ejs', {
          title: 'Crear producto',
      });
    },

    // Ruta para almacenar el producto creado
    guardarProd:(req, res) => {
      // Creo el array de productos usando la función getProducts
      const products = getProducts();

      // Defino la variable que recibe la imagen del formulario
      const image = req.file ? req.file.filename : "default-image.png";

      // Defino la variable que evalúa si es un producto destacado
      const esDestacado = (req.body.destacado === "true") ? "si" : "no";

      // Variable para manejar subcateoría
      let subCatFinal = "";
      
      if (req.body.subCat != "") {
        subCatFinal = req.body.subCat;
      } else if (req.body.subCatAcc != ""){
        subCatFinal = req.body.subCatAcc;
      };

      // Defino la variable que guarda el producto creado desde el formulario
      const newProduct = {
        id: products[products.length-1].id + 1,
			  nombreProducto: req.body.nombreprod,
        descripcion: req.body.descripcion,
			  precio: parseInt(req.body.precio),
			  descuento: parseInt(req.body.descuento),
        mascota: req.body.mascota,
        imagen: image,
        marca: req.body.marca,
        edadMascota: req.body.edadmascota,
        tamanioMascota: req.body.tamaniomascota,
        destacado: esDestacado,
			  categoria: req.body.categoria,
			  subCategoria: subCatFinal,
        presentacion: req.body.presentacion
      };

      // Agrego el producto creado al array de productos
      products.push(newProduct);

      // Actualizo el JSON de productos luego de crear el producto
      fs.writeFileSync(productsFilePath , JSON.stringify(products), {
        flag:"w",
        encoding:"utf-8",
      });
        

      res.render ('../views/mascotas.ejs', {
        title: 'Mascotas'
      });
    },

    //ruta para editar prod
    editarProdController:(req, res) => {
      idProducto = parseInt(req.params.idProd);
      producto = {
        mascota: 'perro',
        nombre: 'Pipeta',
        descuento : 15,
        descripcion : 'PARA EL TRATAMIENTO, CONTROL Y PREVENCIÓN CONTRA PULGAS Y GARRAPATAS PARA PERROS Y GATOS.SE RECOMIENDA LA APLICACIÓN MENSUAL DEL PRODUCTO. SE PUEDE APLICAR EN CACHORROS DESDE LAS 8 SEMANAS DE VIDA Y DE 1 KG DE PESO.',
        precio: 5200,
        categoria: 'cuidados-higiene',
        edadMascota : 'adulto',
        tamañoMascota:'grande',
        marca :'absorsol',
        destacado : 'si'
      }

      res.render('../views/products/editar.ejs', {
          title: 'Editar producto',
          producto
      });
    },

    //ruta /product/perros o /gatos
    productsListController:(req, res) => {
      categoria = ''
      subCategoria = '';
      mascota = req.params.idMascota;
      res.render('../views/products/listado.ejs', {
          title: 'Listado Productos',
          categoria,
          subCategoria,
          mascota
      });
    },
    // ruta para perros/categoria
    CategoryListController:(req, res) => {
      categoria = (req.params.category);
      mascota = req.params.idMascota;
      if (req.params.subCat){
        subCategoria = req.params.subCat
      } else {
        subCategoria = ''
      }     
      res.render('../views/products/listado.ejs', {
          title: 'Listado Productos',
          categoria,
          subCategoria,
          mascota
      });
    },
    //rutas para perros/categoria/subcategoria
    subCategoryListController:(req, res) => {
      categoria = req.params.category;
      mascota = req.params.idMascota;
      if (req.params.subCat){
        subCategoria = req.params.subCat
      } else {
        subCategoria = ''
      }     
      res.render('../views/products/listado.ejs', {
          title: 'Listado Productos',
          categoria,
          subCategoria,
          mascota
      });
    },
   
};
  
module.exports = prodController;