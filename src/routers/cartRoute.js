const { Router } = require("express");
const controllerCart = require("../controllers/cartController");

const routeCart = Router();

//variable para definir rutas dentro de /cart
const routesCart = {
  indexCartRoute: '/'
};

routeCart.get(routesCart.indexCartRoute, controllerCart.indexCartController);

module.exports = routeCart;