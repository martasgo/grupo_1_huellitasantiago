// const path = require("path");

const mainController = {
    homeController: (req, res) => {
      res.render('../views/home.ejs', {
        title: 'Huellitasantiago'
      });
    },
    aboutController: (req, res) => {
      res.render('../views/quienes-somos.ejs', {
        title: 'AboutUs'
      });
    },
    salesController: (req, res) => {
      // res.render(path.resolve("./views/sales.ejs"));
    },
    mayoristasController: (req, res) => {
        // res.render(path.resolve("./views/mayoristas.ejs"));
    },
    enviosController: (req, res) => {
      res.render('../views/envios.ejs', {
        title: 'Envios'
      });;        
    },
    mascotasController: (req, res) => {
        // res.render(path.resolve("./views/mascotas.ejs"));
    },
  };
  
  module.exports = mainController;
  