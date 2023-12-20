const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {
    homeController: (req, res) => {
      //filtro productos que esta como destacados
      const productsDestacado = products.filter((product) => product.destacado === 'si');
      res.render('home', {
        title: 'Huellitasantiago',
        productsDestacado,
        toThousand
      });
    },
    aboutController: (req, res) => {
      res.render('../views/quienes-somos.ejs', {
        title: 'AboutUs'
      });
    },
    salesController: (req, res) => {
      //filtro productos que tiene descuento
      const productsDiscount = products.filter((product) => product.descuento > 0);
      res.render('../views/sales.ejs', {
        title: 'Sales',
        productsDiscount,
        toThousand
      });
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
  