const { Router } = require("express");
const controller = require("../controllers/apiController");
const authMiddleware = require ("../middlewares/authMiddleware");

const router = Router();

const routes = {
  allUsers: '/users',
  userById: '/users/:id',
  products: '/products',
  productsById: '/products/:id',
  cartProduct: '/carts/products/:id',
  checkout: '/checkout'
};

router.get(routes.allUsers, controller.allUsers);
router.get(routes.userById, controller.userById);
router.get(routes.products, controller.allProducts)
router.get(routes.productsById, controller.productById);
router.get(routes.cartProduct, controller.cartProduct);
router.post(routes.checkout, authMiddleware, controller.checkout)

module.exports = router;