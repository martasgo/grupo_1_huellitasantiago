const { Router } = require("express");
const productController = require("../controllers/productController");
const router = require("./mainRoute");

const routerProduct = Router();

const routesProd = {
  indexProductRoute: "/",
  detailProductRoute: "/detalle/:id",
  productCrear: "/crear",
  productEditar: "/editar/:idProd",

  //listado productos: "/product/perros",  /product/gato/
  productsList: "/:idMascota",
  productsListCat: "/:idMascota/:category",
  productsListSubcat: "/:idMascota/:category/:subCat",
};

routerProduct.get(routesProd.indexProductRoute, productController.indexProductController);
routerProduct.get(routesProd.detailProductRoute, productController.detailProductController);

// rutas para obtener form para crear/editar productos
routerProduct.get(routesProd.productCrear, productController.crearProdController);
routerProduct.post(routesProd.indexProductRoute, productController.guardarProd);

routerProduct.get(routesProd.productEditar, productController.editarProdController);
//rutas para mascota=perro o mascota=gato
routerProduct.get(routesProd.productsListCat, productController.CategoryListController);
routerProduct.get(routesProd.productsListSubcat, productController.subCategoryListController);
routerProduct.get(routesProd.productsList, productController.productsListController);



module.exports = routerProduct;