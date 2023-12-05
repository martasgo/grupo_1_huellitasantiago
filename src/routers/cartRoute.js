const { Router } = require("express");
const controllerCart = require("../controllers/cartController");

const routeCart = Router();

//variable para definir rutas dentro de /cart
const routesCart = {
  indexCartRoute: '/',
  checkoutCart: '/checkout'
};

routeCart.get(routesCart.indexCartRoute, controllerCart.indexCartController);
routeCart.get(routesCart.checkoutCart, controllerCart.checkoutCartController);

module.exports = routeCart;