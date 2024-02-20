// DB
const db = require('../model/database/models');
const Op = db.Sequelize.Op;

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

    // Controlador para obtener el listado total de productos, agrupados de a 7
    list: async (req, res) => {
      try {
          const page = parseInt(req.query.page) || 1;
          const allProducts = await productService.getAllByGroup(page);
  
          // Obtener el número total de productos para calcular el número total de páginas
          const totalProducts = await db.Product.count();
          const totalPages = Math.ceil(totalProducts / 7); // Uso la misma cantidad de pagesize usada en el servicio
  
          return res.render('../views/products/allProducts.ejs', {
              title: 'Listado completo de productos',
              allProducts,
              currentPage: page,
              totalPages,
          });
      } catch (error) {
          console.log(error);
          return res.status(500).send('Error en la solicitud');
      }
  },
  
    // controlador ruta detalle producto
    detailProductController: async (req, res) => {
      let idProducto = parseInt(req.params.id);
      let productsDestacado = await productService.getDestacados();
      let producto = await productService.getByPk(idProducto)
      return res.render('../views/products/detalle-producto.ejs', {
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

    //Controlador para renderizar el FORM de edición de un producto (GET)
    editarProdController: async (req, res) => {
      try {
        let idProd = parseInt(req.params.id);
        let producto = await productService.getByPk(idProd);
        let brandList = await brandService.getAll();
        let petList = await petService.getAll();
        let petAgeList = await petAgeService.getAll();
        let petSizeList = await petSizeService.getAll();
        let categoryList = await prodCategoryService.getAll();
        let subCategoryAlimentosList = await subCategoryService.getByCategoryId(1);
        let subCategoryAccesoriosList = await subCategoryService.getByCategoryId(2);
        let packageList = await packageService.getAll();

        return res.render("../views/products/editar.ejs", 
        {producto,
        brandList,
        petList,
        petAgeList,
        petSizeList,
        categoryList,
        subCategoryAlimentosList,
        subCategoryAccesoriosList,
        packageList});
      } 
      catch (error) {
        console.log(error);
        return res.status(500).send('Error en la solicitud');
      }
    },

    //Controlador para guardar en la DB el producto editado (POST)
    updateProdController: async (req, res) => {
      try {
        // Capturo el ID del producto
        let idProd = parseInt(req.params.id);
        
        // Defino la variable que recibe la imagen del formulario
        const image = req.file ? req.file.filename : "default-image.png";

        // Defino la variable que evalúa si es un producto destacado
        const esDestacado = (req.body.destacado === "true") ? 1 : 0;

        // Variable para manejar subcategoría
        let subCatFinal = "";
        if (req.body.categoria == 1) {
          subCatFinal = parseInt(req.body.subCat);
        } else if (req.body.categoria == 2) {
          subCatFinal = parseInt(req.body.subCatAcc);
        } else {
          subCatFinal = null
        }

        // Variable para manejar si viene o no una presentacion
        let presentacionFinal = "";
        if (req.body.categoria == 1) {
          presentacionFinal = parseInt(req.body.presentacion);
        } else {
          presentacionFinal = null
        };

        // Defino la variable que guarda el producto editado desde el formulario
        const modifiedProduct = {
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
          id_sub_categoria: subCatFinal,
          id_presentacion: presentacionFinal,
          stock: parseInt(req.body.stock)
        };    

        // Incorporo a la DB el producto editado y redirecciono a product
        await productService.updateById(modifiedProduct, idProd);
        return res.redirect('/product');
      }
      catch (error) {
        console.log(error);
        return res.status(500).send('Error en la solicitud');
      }		 
    },
    
    //Controlador para eliminar producto por su ID
    eliminarController: async (req, res) =>{
      let idProduct = parseInt(req.params.id);
      try {
          await productService.destroyById(idProduct);
          res.redirect('/product');
        }
      catch (error) {
          console.log(error);
          res.send(error.message);
      }
    },

    //Controlador ruta /product/perros o /gatos
    productsListController:(req, res) => {
      categoria = ''
      subCategoria = '';
      mascota = req.params.idMascota;
      
      //filtro productos de la mascota seleccionada 
      //const productsMascotas = products.filter((product) => product.mascota === mascota || product.mascota === 'perros-gatos' );
      petService.getByMascota(mascota)
      .then ((mascotasLista) => {
        let indices = []
        for (i=0; i < mascotasLista.length; i++){
          indices.push(mascotasLista[i].id);
        }
        productService.getAllByMascotas(indices)
        .then ((productsMascotas) =>{
           res.render('../views/products/listado.ejs', {
            title: 'Listado Productos',
            categoria,
            subCategoria,
            mascota,
            productsMascotas,
            toThousand
          })  
        })
      } 
      )
      .catch((error) => {
        console.log(error)
        res.send(error.message)
      })   
    },
    // Controlador ruta para perros/categoria o gatos/categoria
    CategoryListController:(req, res) => {
      categoria = encodeURIComponent(req.params.category);
      mascota = req.params.idMascota;
      subCategoria = '';

      petService.getByMascota(mascota)
      .then ((mascotasLista) => {
        let indicesMascotas = []
        for (i=0; i < mascotasLista.length; i++){
          indicesMascotas.push(mascotasLista[i].id);
        }
        prodCategoryService.getByField(categoria)
          .then ((categoriaResult) =>{
            let indiceCat = categoriaResult.id;
            productService.getAllByCategory(indicesMascotas, indiceCat)
            .then((productsMascotas)=>{
              res.render('../views/products/listado.ejs', {
                title: 'Listado Productos',
                categoria,
                subCategoria,
                mascota,
                productsMascotas,
                toThousand
              });
            })
        })
      })
      .catch((error) => {
        console.log(error)
        res.send(error.message)
      })      
     
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

  };
  
module.exports = prodController;