const { Router } = require("express");
const controller = require("../controllers/apiController");
const authMiddleware = require ("../middlewares/authMiddleware");

const router = Router();

const routes = {
  allUsers: '/users',
  userById: '/users/:id',
  lastUser: '/lastuser',
  products: '/products',
  productsById: '/products/:id',
  lastProduct: '/lastproduct',
  sales: '/sales',
  cartProduct: '/carts/products/:id',
  checkout: '/checkout'
};

router.get(routes.allUsers, controller.allUsers);
router.get(routes.userById, controller.userById);
router.get(routes.lastUser, controller.lastUser);
router.get(routes.products, controller.allProducts)
router.get(routes.productsById, controller.productById);
router.get(routes.lastProduct, controller.lastProduct);
router.get(routes.sales, controller.sales);
router.get(routes.cartProduct, controller.cartProduct);
router.post(routes.checkout, authMiddleware, controller.checkout)

module.exports = router;