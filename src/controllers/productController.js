// DB
const db = require('../model/database/models');
const Op = db.Sequelize.Op;

//SERVICIO
const productService = require('../model/productService');

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
          const { allProducts, totalPages} = await productService.getPagination(page, 1, 10);
          return res.render('../views/products/allProducts.ejs', {
              title: 'Listado completo de productos',
              allProducts: allProducts,
              currentPage: page,
              totalPages: totalPages,
          });
      } catch (error) {
          console.log(error);
          return res.status(500).send('Error en la solicitud');
      }
    },
  
    // controlador ruta detalle producto
    detailProductController: async (req, res) => {
      try {
        let idProducto = parseInt(req.params.id);
        let productsDestacado = await productService.getDestacados();
        let producto = await productService.getByPk(idProducto)
        return res.render('../views/products/detalle-producto.ejs', {
          title: 'Detalle producto',
          producto: producto,
          productsDestacado: productsDestacado,
          toThousand
        });
      } catch (error) {
        console.error("Error al obtener detalle producto:", error)
        return res.json([]);
      }
    },
    //Controlador ruta para crear prod
    crearProdController: async (req, res) => {
      try {
        let resultado = await productService.getAllServices();
        res.render('../views/products/crear.ejs', {
          title: 'Crear producto',
          brand: resultado.brandList,
          pet: resultado.petList,
          petAge: resultado.petAgeList,
          petSize: resultado.petSizeList,
          category: resultado.categoryList,
          subCategory: resultado.subCategoryList,
          packageRes: resultado.packageList
        });
      } catch (error) {
        console.log(error)
        return res.status(500).send('Error en la solicitud');
      }
    },
    
    //Controlador Ruta para almacenar el producto creado
    guardarProd: async (req, res) => {
      try {
        //Validacion de errores en el formulario de creacion de producto
        let errors = validationResult(req);  
        if (! errors.isEmpty()) {
          // En caso de errores, verificamos si hay una imagen subida, para
          // eliminarla
          if (req.file) {
            await productService.deleteImagen(req.file.filename);
          }
          let resultado = await productService.getAllServices();
          
          res.render('../views/products/crear.ejs', {
            title: 'Crear producto',
            brand: resultado.brandList,
            pet: resultado.petList,
            petAge: resultado.petAgeList,
            petSize: resultado.petSizeList,
            category: resultado.categoryList,
            subCategory: resultado.subCategoryList,
            packageRes: resultado.packageList,
            errors: errors.mapped(),
            old: req.body
          });
        } else {
          let prodGuardado = await productService.createProdInfo(req);
          if (prodGuardado) {
            let idProd = prodGuardado.id
            res.redirect(`/product/detalle/${idProd}`)
          }
        }
      } catch (error) {
        console.log(error)
        return res.status(500).send('Error en la solicitud para dar de alta el producto');
      }
    },
    //Controlador para renderizar el FORM de edición de un producto (GET)
    editarProdController: async (req, res) => {
      try {
        let idProd = parseInt(req.params.id);
        let producto = await productService.getByPk(idProd);
        let resultado = await productService.getAllServices();

        return res.render("../views/products/editar.ejs", 
        {
          producto: producto,
          brandList: resultado.brandList,
          petList: resultado.petList,
          petAgeList: resultado.petAgeList,
          petSizeList: resultado.petSizeList,
          categoryList: resultado.categoryList,
          subCategoryAlimentosList: resultado.subCategoryAlimentosList,
          subCategoryAccesoriosList: resultado.subCategoryAccesoriosList,
          packageList: resultado.packageList
        });
      } 
      catch (error) {
        console.log(error);
        return res.status(500).send('Error en la solicitud de edición de producto');
      }
    },

    //Controlador para guardar en la DB el producto editado (POST)
    updateProdController: async (req, res) => {
      try {
         //Validacion de errores en el formulario de creacion de producto
        let errors = validationResult(req);
        let idProd = parseInt(req.params.id);
        let producto = await productService.getByPk(idProd); 
        if (! errors.isEmpty()) {
          // En caso de errores, verificamos si hay una imagen subida, para
          // eliminarla
          if (req.file) {
            await productService.deleteImagen(req.file.filename);
          };
          let resultado = await productService.getAllServices();
          res.render("../views/products/editar.ejs", 
          {
            producto: producto,
            brandList: resultado.brandList,
            petList: resultado.petList,
            petAgeList: resultado.petAgeList,
            petSizeList: resultado.petSizeList,
            categoryList: resultado.categoryList,
            subCategoryAlimentosList: resultado.subCategoryAlimentosList,
            subCategoryAccesoriosList: resultado.subCategoryAccesoriosList,
            packageList: resultado.packageList,
            errors: errors.mapped(),
            old: req.body
          });

        } else {
            let resultEdit = await productService.editProdInfo(req, producto);
            console.log(resultEdit)
           // return res.render('')
          return res.redirect(`/product/editar/${idProd}?mensaje=procesado`);
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send('Error en la solicitud de edición de producto');
      }
    },
    
    //filtros procesamiento
    filtersApplied: async (req, res) => {  
      try {
        let filtrosList = await productService.getFilterSelected(req);
        let resultadofiltros = await productService.getAllByFileters(req.body, filtrosList.indices, filtrosList.idCategory, filtrosList.idSubCategory)
        let resultado = await productService.getAllServices();

        res.render('../views/products/listado.ejs', {
          title: 'Listado Productos',
          productsMascotas: resultadofiltros,
          mascota: filtrosList.mascota, 
          categoria: filtrosList.categoria, 
          subCategoria: filtrosList.subCategoria,
          //listados para armar los filtros en la vista listado.ejs que incluye un partial
          //filtros-productos.ejs
          brand: resultado.brandList,
          petAge: resultado.petAgeList, 
          pestSize: resultado.petSizeList, 
          categorias: resultado.categoryList, 
          subCat: resultado.subCategoryList,
          toThousand
        }) 

      } catch (error) {
        console.log(error)
        res.status(500).send('No se pudo procesar la solicitud correctamente - '+ error.message);
      }     
    },

    //Controlador para eliminar producto por su ID
    // TODO BORRADO LOGICO
    eliminarController: async (req, res) =>{
      let idProduct = parseInt(req.params.id);
      try {
          await productService.destroyById(idProduct);
          return res.redirect('/user/profile');
        }
      catch (error) {
        console.log(error)
        res.status(500).send('No se pudo procesar la solicitud de baja del producto - '+ error.message);
      }
    },

    // Controlador ruta para perros/categoria o gatos/categoria/subcat
    CategoryListController: async (req, res) => {
      try {
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
        let resultado = await productService.getAllServices();

        let resultadoMascotaCatSubcat = await productService.getBusqueda(mascota, categoria, subCategoria);

        res.render('../views/products/listado.ejs', {
          title: 'Listado Productos',
          categoria: categoria,
          subCategoria: subCategoria,
          mascota: mascota,
          productsMascotas : resultadoMascotaCatSubcat,
          //listados para armar los filtros en la vista listado.ejs que incluye un partial
          //filtros-productos.ejs
          brand: resultado.brandList,
          pet: resultado.petList, 
          petAge: resultado.petAgeList, 
          pestSize: resultado.petSizeList, 
          categorias: resultado.categoryList, 
          subCat: resultado.subCategoryList,
          toThousand
        }); 
      } catch (error) {
        console.log(error)
        res.status(500).send('No se pudo procesar la ruta de mascostas/categorias/subcategorias - '+ error.message);
      }
    }
  };
  
module.exports = prodController;