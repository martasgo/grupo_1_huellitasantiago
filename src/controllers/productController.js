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

// Express validator para aplicar validaciones en formularios
const { validationResult } = require ("express-validator");

function toThousand(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const fs = require('fs');
const path = require('path');

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
          const allProducts = await productService.getAllByGroup(page, 5);
  
          // Obtener el número total de productos para calcular el número total de páginas
          const totalProducts = await db.Product.count();
          const totalPages = Math.ceil(totalProducts / 5); // Uso la misma cantidad de pagesize usada en el servicio
  
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
              return res.status(500).send('Error en la solicitud');
            })
    },
    
    //Controlador Ruta para almacenar el producto creado
    guardarProd: (req, res) => {
      //Validacion de errores en el formulario de creacion de producto
      let errors = validationResult(req);  
      if (! errors.isEmpty()) {
        // En caso de errores, verificamos si hay una imagen subida, para
        // eliminarla
        if (req.file) {
          productService.deleteImagen(req.file.filename);
        }
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
                  packageRes,
                  errors: errors.mapped(),
                  old: req.body
              });
              })
              .catch(error => {
                console.log(error)
                return res.status(500).send('Error en la solicitud');
              })
  
      } else {
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
        .then((prodAdded) => {
          let idProd = prodAdded.id
          res.redirect(`/product/detalle/${idProd}`)
        })
      .catch((error) => {
        console.log(error)
        res.send(error.message)
      })
     }
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
      //Validacion de errores en el formulario de creacion de producto
      let errors = validationResult(req);  
      if (! errors.isEmpty()) {
        // En caso de errores, verificamos si hay una imagen subida, para
        // eliminarla
        if (req.file) {
          productService.deleteImagen(req.file.filename);
        };
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

        res.render("../views/products/editar.ejs", 
        {producto,
        brandList,
        petList,
        petAgeList,
        petSizeList,
        categoryList,
        subCategoryAlimentosList,
        subCategoryAccesoriosList,
        packageList,
        errors: errors.mapped(),
        old: req.body});

      } else {
        try {
          // Capturo el ID del producto
          let idProd = parseInt(req.params.id);
          
          // Defino la variable que recibe la imagen del formulario
          const image = req.file ? req.file.filename : "default-image.png";
  
          // Defino la variable que evalúa si es un producto destacado
          const esDestacado = (req.body.destacado === "true") ? 1 : 0;
  
          // Variable para manejar subcategoría
          let subCatFinal = "";
          if (parseInt(req.body.categoria) == 1) {
            if (req.body.subCat == "") {
              subCatFinal = null
            } else {
              subCatFinal = parseInt(req.body.subCat);
            }
          } else if (parseInt(req.body.categoria) == 2) {
            if (req.body.subCatAcc == "") {
              subCatFinal = null
            } else {
              subCatFinal = parseInt(req.body.subCatAcc);
            }
          } else {
            subCatFinal = null
          }
  
          // Variable para manejar si viene o no una presentacion
          let presentacionFinal = "";
          if (parseInt(req.body.categoria) == 1) {
            if (req.body.presentacion == "") {
              presentacionFinal = null
            } else {
              presentacionFinal = req.body.presentacion;
            }
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
      }
    },
    //filtros procesamiento
    filtersApplied: async (req, res) => {
      console.log (req.body)
      console.log('valores')
      //console.log(mascota)
            
      idCategory ='';
      idSubCategory ='';
      if (req.params.idMascota) {
        console.log('llega')
         mascota = req.params.idMascota
         idPetList = await petService.getByMascota(mascota);
         console.log(idPetList);
         indices = idPetList.map(({ id }) => id);
      }
      
      if (req.params.idCat) {
         categoria = req.params.idCat.replace(/-/g, ' ');
         idCategory = await prodCategoryService.getByField(categoria);
         console.log(idCategory)
      }
      
      if (req.params.idSubCat) {
         subCategoria = req.params.idSubCat.replace(/-/g, ' ')
         id = idCategory.id;
         console.log('el id de la cat')
         console.log(id)
         idSubCategory = await subCategoryService.getByField(subCategoria, idCategory.id)
         console.log(idSubCategory)
      }
      
      let brand = await brandService.getAll();
      let petAge = await petAgeService.getAll();
      let pestSize = await petSizeService.getAll();
      let categorias = await prodCategoryService.getAll();
      let subCat = await subCategoryService.getAll();

      productService.getAllByFileters(req.body, indices, idCategory, idSubCategory)
      .then((productsMascotas)=>{
        res.location('/product');
        console.log(res.get('location'));
         res.render('../views/products/listado.ejs', {
          title: 'Listado Productos',
          productsMascotas,
          mascota, 
          categoria, 
          subCategoria,
          //listados para armar los filtros en la vista listado.ejs que incluye un partial
          //filtros-productos.ejs
          brand,
          petAge, 
          pestSize, 
          categorias, 
          subCat,
          toThousand
        }) 
      })
      .catch((error) => {
        console.log(error)
        res.status(500).send('No se pudo procesar la solicitud correctamente - '+ error.message);
      })  
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

    // Controlador ruta para perros/categoria o gatos/categoria
    CategoryListController:(req, res) => {
      mascota = req.params.idMascota;
      categoria = ''
      subCategoria = '';
      
      if (req.params.category){
        categoria = req.params.category.replace(/-/g, ' ');
      } else {
        categoria = null
      }  

      if (req.params.subCat){
        subCategoria = req.params.subCat.replace(/-/g, ' ');
      } else {
        subCategoria = null
      }  

      // servicios para armar el filtro de productos que se muestra en la vista listado.ejs
      let brandList =  brandService.getAll();
      let petList =  petService.getAll();
      let petAgeList =  petAgeService.getAll();
      let petSizeList =  petSizeService.getAll();
      let categoryList =  prodCategoryService.getAll();
      let subCategList = subCategoryService.getAll();
      
      Promise.all([brandList, petList, petAgeList,petSizeList,categoryList, subCategList ])
            .then(function ([brand, pet, petAge, pestSize, categorias, subCat]) {
              //busco el id de mascotas
              petService.getByMascota(mascota)
              .then ((mascotasLista) => {
                let indicesMascotas = []
                indicesMascotas = mascotasLista.map(({ id }) => id);
                if (req.params.category){
                  //busco el id de categoria
                  prodCategoryService.getByField(categoria)
                    .then ((categoriaResult) =>{
                      let indiceCat = categoriaResult.id;
                      if (req.params.subCat){
                          // SI VIENE subCATEGORIA
                          //busco el id de la subcategoria + id de la categoria
                          subCategoryService.getByField(subCategoria, indiceCat)
                          .then((resultSubCat) =>{
                              let indiceSubCat = resultSubCat.id
                              productService.getAllBySubCategory(indicesMascotas, indiceCat, indiceSubCat)
                              .then((productsMascotas)=>{
                                res.render('../views/products/listado.ejs', {
                                  title: 'Listado Productos',
                                  categoria,
                                  subCategoria,
                                  mascota,
                                  productsMascotas,
                                  //listados para armar los filtros en la vista listado.ejs que incluye un partial
                                  //filtros-productos.ejs
                                  brand,
                                  pet, 
                                  petAge, 
                                  pestSize, 
                                  categorias, 
                                  subCat,
                                  toThousand
                                }); 
                              })
                          })
                      } else {
                        //SI NO VIENE SUB-CATEGORIA
                        productService.getAllByCategory(indicesMascotas, indiceCat)
                          .then((productsMascotas)=>{
                            res.render('../views/products/listado.ejs', {
                                title: 'Listado Productos',
                                categoria,
                                subCategoria,
                                mascota,
                                productsMascotas,
                                //listados para armar los filtros en la vista listado.ejs que incluye un partial
                                //filtros-productos.ejs
                                brand,
                                pet, 
                                petAge, 
                                pestSize, 
                                categorias, 
                                subCat,
                                toThousand
                            }); 
                          })
                      } 
                    })
                } else {//no viene categoria
                  productService.getAllByMascotas(indicesMascotas)
                  .then ((productsMascotas) =>{
                    res.render('../views/products/listado.ejs', {
                      title: 'Listado Productos',
                      categoria,
                      subCategoria,
                      mascota,
                      productsMascotas,
                      //listados para armar los filtros en la vista listado.ejs que incluye un partial
                      //filtros-productos.ejs
                      brand,
                      pet, 
                      petAge, 
                      pestSize, 
                      categorias, 
                      subCat,
                      toThousand
                    })  
                  })
                }
              })
           })
      .catch((error) => {
        console.log(error)
        res.send(error.message)
      })      
    }
  };
  
module.exports = prodController;