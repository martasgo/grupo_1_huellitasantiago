const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const prodController = {
    indexProductController: (req, res) => {
      res.render ('../views/mascotas.ejs', {
        title: 'Mascotas'
      });
    },
    detailProductController:(req, res) => {
        idProducto = parseInt(req.params.id);
        if (idProducto === 1 ){
            res.render('../views/products/detalle-producto.ejs', {
                /* aqui se mandaria le objeto de cada articulo para hacerlo dinámico */
                title: 'Detalle producto',
            });
        }
    },
    //ruta para crear prod
    crearProdController:(req, res) => {
      res.render('../views/products/crear.ejs', {
          title: 'Crear producto',
      });
    },
    eliminarController: (req, res) =>{
      const idProd = parseInt(req.params.id);
      //console.log(idProd);
      newList = [];
      for (var i=0; i<=products.length-1; i++){
        idProducto = products[i].id;
        //console.log(idProducto);
        if (idProducto !== idProd) {
          newList.push(products[i]);
        }
      }
      //console.log(newList);
      fs.writeFileSync(productsFilePath, JSON.stringify(newList));
      res.redirect('/product');
    },
    //ruta para editar prod
    editarProdController:(req, res) => {
      idProducto = parseInt(req.params.idProd);
      producto = {
        mascota: 'perro',
        nombre: 'Pipeta',
        descuento : 15,
        descripcion : 'PARA EL TRATAMIENTO, CONTROL Y PREVENCIÓN CONTRA PULGAS Y GARRAPATAS PARA PERROS Y GATOS.SE RECOMIENDA LA APLICACIÓN MENSUAL DEL PRODUCTO. SE PUEDE APLICAR EN CACHORROS DESDE LAS 8 SEMANAS DE VIDA Y DE 1 KG DE PESO.',
        precio: 5200,
        categoria: 'cuidados-higiene',
        edadMascota : 'adulto',
        tamañoMascota:'grande',
        marca :'absorsol',
        destacado : 'si'
      }

      res.render('../views/products/editar.ejs', {
          title: 'Editar producto',
          producto
      });
    },

    guardarProd:(req, res) => {
      res.render ('../views/mascotas.ejs', {
        title: 'Mascotas'
      });
    },

    //ruta /product/perros o /gatos
    productsListController:(req, res) => {
      categoria = ''
      subCategoria = '';
      mascota = req.params.idMascota;

      //filtro productos de la mascota seleccionada 
      const productsMascotas = products.filter((product) => product.mascota === mascota || product.mascota === 'perros-gatos' );

      res.render('../views/products/listado.ejs', {
          title: 'Listado Productos',
          categoria,
          subCategoria,
          mascota,
          productsMascotas,
          toThousand
      });
    },
    // ruta para perros/categoria
    CategoryListController:(req, res) => {
      categoria = req.params.category;
      mascota = req.params.idMascota;
      subCategoria = '';

      productsMascotas = products.filter((product) => product.mascota === mascota || product.mascota === 'perros-gatos' );
      productsMascotas = productsMascotas.filter((product) => product.categoria === categoria);
         
      res.render('../views/products/listado.ejs', {
          title: 'Listado Productos',
          categoria,
          subCategoria,
          mascota,
          productsMascotas,
          toThousand
      });
    },
    //rutas para perros/categoria/subcategoria
    subCategoryListController:(req, res) => {
      categoria = req.params.category;
      mascota = req.params.idMascota;

      productsMascotas = products.filter((product) => product.mascota === mascota || product.mascota === 'perros-gatos' );
      productsMascotas = productsMascotas.filter((product) => product.categoria === categoria);

      if (req.params.subCat){
        subCategoria = req.params.subCat;
        productsMascotas = productsMascotas.filter((product) => product.subCategoria === subCategoria);
      } else {
        subCategoria = ''
      }     
      res.render('../views/products/listado.ejs', {
          title: 'Listado Productos',
          categoria,
          subCategoria,
          mascota,
          productsMascotas,
          toThousand
      });
    },
   
};
  
module.exports = prodController;