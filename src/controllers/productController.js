//SERVICIOS
const productService = require('../model/productService');
const brandService = require('../model/brandService');
const packageService = require('../model/packageService');
const petAgeService = require('../model/petAgeService');
const petService = require('../model/petService');
const prodCategoryService = require('../model/prodCategoryService');
const subCategoryService = require('../model/subCategoryService');
const petSizeService = require('../model/petSizeService');

const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');

function getProducts() {
  return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const prodController = {
    indexProductController: (req, res) => {
      res.render ('../views/mascotas.ejs', {
        title: 'Mascotas'
      });
    },
  
    // controlador ruta detalle producto
    detailProductController:(req, res) => {
      idProducto = parseInt(req.params.id);
      productos = getProducts();
      producto = productos.filter(product => product.id === idProducto);
      const productsDestacado = productos.filter((product) => product.destacado === 'si');
      
          res.render('../views/products/detalle-producto.ejs', {
              /* aqui se mandaria le objeto de cada articulo para hacerlo dinámico */
              title: 'Detalle producto',
              producto,
              productsDestacado,
              toThousand
          });
      
    },
    //Controlador ruta para crear prod
    crearProdController:(req, res) => {
      let brandList = brandService.getAll();
      let petList = petService.getAll();
      let petAgeList = petAgeService.getAll();
      let petSizeList = petSizeService.getAll();
      let categoryList = prodCategoryService.getAll();
      let subCategoryList = subCategoryService.getAll();
      let packageList = packageService.getAll();
      
      Promise.all([brandList, petList, petAgeList, petSizeList, categoryList, subCategoryList, packageList ])
            .then(function ([brand, pet, petAge, petSize, category, subCategory, packageRes]) {
              res.render('../views/products/crear.ejs', {
                title: 'Crear producto',
                brand,
                pet,
                petAge,
                petSize,
                category,
                subCategory,
                packageRes
            });
            })
            .catch(error => {
              console.log(error)
              //res.send(error.message)
              return res.status(500).send('Error en la solicitud');
            })
    },
    //Controlador ruta para eliminar producto
    eliminarController: (req, res) =>{
      const idProd = parseInt(req.params.id);
      const products = getProducts();
      newList = [];
      for (var i=0; i<=products.length-1; i++){
        idProducto = products[i].id;
        if (idProducto !== idProd) {
          newList.push(products[i]);
        }
      }
      fs.writeFileSync(productsFilePath, JSON.stringify(newList));
      res.redirect('/product');
    },
    //Controlador Ruta para almacenar el producto creado
    guardarProd: (req, res) => {
      // Defino la variable que recibe la imagen del formulario
      const image = req.file ? req.file.filename : "default-image.png";

      // Defino la variable que evalúa si es un producto destacado
      const esDestacado = (req.body.destacado === "true") ? 1 : 0;

      // Variable para manejar subcategoría
      let subCatFinal = "";
            if (req.body.subCat != "") {
        subCatFinal = parseInt(req.body.subCat);
      } else if (req.body.subCatAcc != ""){
        subCatFinal = parseInt(req.body.subCatAcc);
      } else {
        subCatFinal = null
      };

      // Variable para manejar si viene o no una presentacion
      if (req.body.presentacion != "") {
        presentacionFinal = parseInt(req.body.presentacion);
      } else {
        presentacionFinal = null
      }

      // Defino la variable que guarda el producto creado desde el formulario
      const newProduct = {
			  nombre: req.body.nombreprod,
        descripcion: req.body.descripcion,
			  precio: parseInt(req.body.precio),
			  descuento: parseInt(req.body.descuento),
        id_mascota: parseInt(req.body.mascota),
        imagen: image,
        id_marca: parseInt(req.body.marca),
        id_edad_mascota: parseInt(req.body.edadmascota),
        id_tamanio_mascota: parseInt(req.body.tamaniomascota),
        destacado: esDestacado,
			  id_categoria: parseInt(req.body.categoria),
			  id_sub_Categoria: subCatFinal,
        id_presentacion: presentacionFinal,
        stock: parseInt(req.body.stock)
      };    
           
      /* podemos mandar a la pagina de detalle del producto para validar la carga tambien
      dejo ejemplo de otra opcion como probar*/
      //res.redirect(`/movies/${req.params.id}/detail`))
      //res.status(201).json(new CreateResponse(productoNuevo.id, `${req.protocol}://${req.get('host')}${req.originalUrl}/${productoNuevo.id}`))
          /* res.render ('../views/mascotas.ejs', {
            title: 'Mascotas'
          }); */
        
        productService.add(newProduct)
        .then(() =>
            res.render ('../views/mascotas.ejs', {
              title: 'Mascotas',
              status: 200
            })
        )
      .catch((error) => {
        console.log(error)
        res.send(error.message)
      })
     },
    //Controlador para editar prod -sole
    editarProdController:(req, res) => {
      const productos = getProducts();
      const id = parseInt(req.params.id);	
      const producto = productos.find((product)=> product.id == id);
  
      res.render("../views/products/editar.ejs", {producto});
    },
    //Controlador Guardar del Editar -Sole
    updateProdController: (req, res) => {		
      const productos =getProducts();
      const {id} = req.params;

      let subCatFinal = "";
      
      if (req.body.subCat != "") {
        subCatFinal = req.body.subCat;
      } else if (req.body.subCatAcc != ""){
        subCatFinal = req.body.subCatAcc;
      };

      const esDestacado = (req.body.destacado === "true") ? "si" : "no";
                  
      const productToEdit = productos.findIndex((product)=> product.id ==id);
      productos[productToEdit].nombreProducto= req.body.nombreprod;
      productos[productToEdit].descripcion = req.body.descripcion;
      productos[productToEdit].precio = parseInt(req.body.precio);
      productos[productToEdit].descuento = parseInt(req.body.descuento);
      productos[productToEdit].mascota = req.body.mascota;
      productos[productToEdit].imagen = req.file ? req.file.filename : productos[productToEdit].imagen;
      productos[productToEdit].marca = req.body.marca;
      productos[productToEdit].edadMascota = req.body.edadmascota;
      productos[productToEdit].tamanioMascota = req.body.tamaniomascota;
      productos[productToEdit].destacado = esDestacado;
      productos[productToEdit].categoria = req.body.categoria;
      productos[productToEdit].subCategoria = subCatFinal;
      productos[productToEdit].presentacion = req.body.presentacion;
    
      fs.writeFileSync(productsFilePath, JSON.stringify(productos));  
      res.redirect("/product");          
    },
    //Controlador ruta /product/perros o /gatos
    productsListController:(req, res) => {
      categoria = ''
      subCategoria = '';
      mascota = req.params.idMascota;
      const products = getProducts();

      //filtro productos de la mascota seleccionada 
      const productsMascotas = products.filter((product) => product.mascota === mascota || product.mascota === 'perros-gatos' );

      res.render('../views/products/listado.ejs', {
          title: 'Listado Productos',
          categoria,
          subCategoria,
          mascota,
          productsMascotas,
          toThousand
      });
    },
    // Controlador ruta para perros/categoria o gatos/categoria
    CategoryListController:(req, res) => {
      categoria = req.params.category;
      mascota = req.params.idMascota;
      const products = getProducts();
      subCategoria = '';

      productsMascotas = products.filter((product) => product.mascota === mascota || product.mascota === 'perros-gatos' );
      productsMascotas = productsMascotas.filter((product) => product.categoria === categoria);
         
      res.render('../views/products/listado.ejs', {
          title: 'Listado Productos',
          categoria,
          subCategoria,
          mascota,
          productsMascotas,
          toThousand
      });
    },
    //Controlador rutas para perros/categoria/subcategoria o gatos/categoria/subcategoria
    subCategoryListController:(req, res) => {
      categoria = req.params.category;
      mascota = req.params.idMascota;
      const products = getProducts();

      productsMascotas = products.filter((product) => product.mascota === mascota || product.mascota === 'perros-gatos' );
      productsMascotas = productsMascotas.filter((product) => product.categoria === categoria);

      if (req.params.subCat){
        subCategoria = req.params.subCat;
        productsMascotas = productsMascotas.filter((product) => product.subCategoria === subCategoria);
      } else {
        subCategoria = ''
      }     
      res.render('../views/products/listado.ejs', {
          title: 'Listado Productos',
          categoria,
          subCategoria,
          mascota,
          productsMascotas,
          toThousand
      });
    },

    // delete
  };
  
module.exports = prodController;