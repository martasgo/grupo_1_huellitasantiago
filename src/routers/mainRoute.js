const { Router } = require("express");
const controller = require("../controllers/mainController");

const router = Router();

const routes = {
  homeRoute: "/",
  aboutRoute: "/about",
  salesRoute: "/sales",
  mayoristasRoute: "/mayoristas",
  enviosRoute: "/envios",
  mascotasRoute: "/mascotas",
  searchRoute: "/search",
  mediospago: "/mediospago"
};

router.get(routes.homeRoute, controller.homeController);
router.get(routes.aboutRoute, controller.aboutController);
router.get(routes.salesRoute, controller.salesController);
router.get(routes.mayoristasRoute, controller.mayoristasController);
router.get(routes.enviosRoute, controller.enviosController);
router.get(routes.mascotasRoute, controller.mascotasController);
router.post(routes.searchRoute, controller.searchController);
router.get(routes.mediospago, controller.mediospagoController);

module.exports = router;