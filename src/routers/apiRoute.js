const { Router } = require("express");
const controller = require("../controllers/apiController");
const authMiddleware = require ("../middlewares/authMiddleware");

const router = Router();

const routes = {
  products: '/products',
  productsById: '/products/:id',
  checkout: '/checkout'
};

router.get(routes.products, controller.allProducts)
router.get(routes.productsById, controller.productById);
router.post(routes.checkout, authMiddleware, controller.checkout)

module.exports = router;