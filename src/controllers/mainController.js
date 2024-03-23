const fs = require('fs');
const path = require('path');
const productService = require('../model/productService');
function toThousand(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

 
const mainController = {
    homeController: async (req, res) => {      
      let productsDestacado = await productService.getDestacados();
      res.render('home', {
        title: 'Huellitasantiago',
        productsDestacado: productsDestacado,
        toThousand        
      });
    },
      salesController: async (req, res) => {        
        const productsDiscount = await productService.getDescuento() ;
        res.render('../views/sales.ejs', {
          title: 'Sales',
          productsDiscount: productsDiscount,
          toThousand         
        });
      },    
    aboutController: (req, res) => {
      res.render('../views/quienes-somos.ejs', {
        title: 'AboutUs'
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
  },
  searchController: async (req, res) => {
    let word = req.body.buscarProd;
    let productsDestacado= await productService.getByKeyWord(word);     
      res.render('../views/busqueda.ejs', {
        title: 'Busqueda', 
        productsDestacado: productsDestacado,
        toThousand    
    });  
  },
  mediospagoController: (req, res) => {
    res.render('../views/medios-pagos.ejs', {
      title: 'Medios de pago'
    });;
  }
}
  module.exports = mainController;
  