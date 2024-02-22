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
  // Ruta prueba para el search
  searchRoute: "/search"
};

router.get(routes.homeRoute, controller.homeController);
router.get(routes.aboutRoute, controller.aboutController);
router.get(routes.salesRoute, controller.salesController);
router.get(routes.mayoristasRoute, controller.mayoristasController);
router.get(routes.enviosRoute, controller.enviosController);
router.get(routes.mascotasRoute, controller.mascotasController);
// Ruta prueba para el search
router.post(routes.searchRoute, controller.searchController);

module.exports = router;