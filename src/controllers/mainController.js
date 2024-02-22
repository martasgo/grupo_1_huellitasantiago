const fs = require('fs');
const path = require('path');
const productService = require('../model/productService');

 
const mainController = {
    homeController: async (req, res) => {      
      let productsDestacado = await productService.getDestacados();
      res.render('home', {
        title: 'Huellitasantiago',
        productsDestacado,        
      });
    },
      salesController: async (req, res) => {        
        const productsDiscount = await productService.getDescuento() ;
        res.render('../views/sales.ejs', {
          title: 'Sales',
          productsDiscount,         
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
      productsDestacado    
  });  
  }
}
  module.exports = mainController;
  