const { Router } = require("express");
// IMPORTO EL SERVICE DE PRODUCT
const productController = require("../controllers/productController");
const router = require("./mainRoute");
const authMiddleware = require ("../middlewares/authMiddleware");
const adminMiddleware = require ("../middlewares/adminMiddleware");
const upload = require("../middlewares/multerMiddleware");
const productValidations = require ("../middlewares/productValidations");

const routerProduct = Router();

const routesProd = {
  indexProductRoute: "/",
  list: '/list',
  detailProductRoute: "/detalle/:id",
  productCrear: "/crear",
  productEditar: "/editar/:id",
  productDelete: '/delete/:id',
  productFilters: "/filtros/:idMascota/:idCat?/:idSubCat?",

  //listado productos: "/product/perros",  /product/perro/alimento, product/perro/alimento/latas  
  productsList: "/:idMascota/:category?/:subCat?",
};

// rutas para mostrar la categoria de mascotas y de ahi ver productos
routerProduct.get(routesProd.indexProductRoute, productController.indexProductController);

// ruta para obtener el listado completo de productos
routerProduct.get(routesProd.list, authMiddleware , adminMiddleware, productController.list);

// rutas para ver detalle de producto
routerProduct.get(routesProd.detailProductRoute, productController.detailProductController);

// rutas para obtener form para crear productos
routerProduct.get(routesProd.productCrear, authMiddleware , adminMiddleware , productController.crearProdController);
routerProduct.post(routesProd.productCrear, authMiddleware , adminMiddleware , upload.single("foto") , productValidations, productController.guardarProd);

// rutas para obtener form para editar productos
routerProduct.get(routesProd.productEditar, authMiddleware , adminMiddleware , productController.editarProdController); //sole get de editar
routerProduct.put(routesProd.productEditar, authMiddleware , adminMiddleware ,  upload.single('foto'), productValidations, productController.updateProdController); //sole put de editar

// rutas para eliminar producto
routerProduct.get(routesProd.productDelete, authMiddleware , adminMiddleware , productController.eliminarController);

//filtros 
routerProduct.post(routesProd.productFilters, productController.filtersApplied);

//rutas para mascota=perro o mascota=gato
routerProduct.get(routesProd.productsList, productController.CategoryListController);

module.exports = routerProduct;