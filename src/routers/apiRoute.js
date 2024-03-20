const { Router } = require("express");
const controller = require("../controllers/apiController");
const authMiddleware = require ("../middlewares/authMiddleware");

const router = Router();

const routes = {
  // allProducts: '/products',
  // productById: '/product/:id',
  checkout: '/checkout',
  allUsers: '/users',
  userById: '/users/:id'
};

// router.get(routes.productById, controller.productById);
// router.get(routes.allProducts, controller.allProducts);
router.post(routes.checkout, authMiddleware, controller.checkout);
router.get(routes.allUsers, controller.allUsers);
router.get(routes.userById, controller.userById);

module.exports = router;