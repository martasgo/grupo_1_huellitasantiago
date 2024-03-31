const fs = require('fs');
const path = require('path');
const productService = require('../model/productService');
function toThousand(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

 
const mainController = {
    homeController: async (req, res) => { 
      try {
        let productsDestacado = await productService.getDestacados();
        res.render('home', {
          title: 'Huellitasantiago',
          productsDestacado: productsDestacado,
          toThousand        
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send('Error para mostrar la home');
      }     
      
    },
    salesController: async (req, res) => {   
      try {
        const productsDiscount = await productService.getDescuento() ;
        res.render('../views/sales.ejs', {
          title: 'Sales',
          productsDiscount: productsDiscount,
          toThousand         
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send('Error para mostrar sales');
      }     
        
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
    try {
      let word = req.body.buscarProd2;
      let productsDestacado= await productService.getByKeyWord(word);     
      res.render('../views/busqueda.ejs', {
        title: 'Busqueda', 
        productsDestacado: productsDestacado,
        toThousand    
    });  
    } catch (error) {
      console.log(error);
      return res.status(500).send('Error para mostrar los resultados de la búsqueda');
    }
    
  },
  mediospagoController: (req, res) => {
    res.render('../views/medios-pagos.ejs', {
      title: 'Medios de pago'
    });;
  }
}
  module.exports = mainController;
  