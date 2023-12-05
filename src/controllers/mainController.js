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
        res.render("../views/mayoristas.ejs", {
          title:'Mayoristas'
        });
    },
    enviosController: (req, res) => {
      res.render('../views/envios.ejs', {
        title: 'Envios'
      });;        
    },
    mascotasController: (req, res) => {
      res.render('../views/mascotas.ejs', {
        title: 'Mascotas'
    });
  }
}
  
  module.exports = mainController;
  