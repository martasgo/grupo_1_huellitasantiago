// const path = require("path");

const mainController = {
    homeController: (req, res) => {
      res.render('home', {
        title: 'Huellitasantiago'
      });
    },
    aboutController: (req, res) => {
      res.render('../views/quienes-somos.ejs', {
        title: 'AboutUs'
      });
    },
    salesController: (req, res) => {
      res.render('../views/sales.ejs', {
        title: 'Sales'
      });
    },
    mayoristasController: (req, res) => {
        // res.render(path.resolve("./views/mayoristas.ejs"));
    },
    enviosController: (req, res) => {
        // res.render(path.resolve("./views/envios.ejs"));
    },
    mascotasController: (req, res) => {
        // res.render(path.resolve("./views/mascotas.ejs"));
    },
  };
  
  module.exports = mainController;
  