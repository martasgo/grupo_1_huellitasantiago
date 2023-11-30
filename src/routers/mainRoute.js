const { Router } = require("express");
const controller = require("../controllers/mainController");

const router = Router();

const routes = {
  homeRoute: "/",
  aboutRoute: "/about",
  salesRoute: "/sales",
  mayoristasRoute: "/mayoristas",
  enviosRoute: "/envios",
  mascotasRoute: "/mascotas"
};

router.get(routes.homeRoute, controller.homeController);
router.get(routes.aboutRoute, controller.aboutController);
router.get(routes.salesRoute, controller.salesController);
router.get(routes.mayoristasRoute, controller.mayoristasController);
router.get(routes.enviosRoute, controller.enviosController);
router.get(routes.mascotasRoute, controller.mascotasController);

module.exports = router;