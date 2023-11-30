const { Router } = require("express");
const productController = require("../controllers/productController");

const routerProduct = Router();

const routesProd = {
  indexProductRoute: "/",
  detailProductRoute: "/:id"
};

routerProduct.get(routesProd.indexProductRoute, productController.indexProductController);
routerProduct.get(routesProd.detailProductRoute, productController.detailProductController);

module.exports = routerProduct;