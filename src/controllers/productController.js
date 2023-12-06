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
      res.render('../views/products/listado.ejs', {
          title: 'Listado Productos',
          categoria,
          subCategoria,
          mascota
      });
    },
    // ruta para perros/categoria
    CategoryListController:(req, res) => {
      categoria = (req.params.category);
      mascota = req.params.idMascota;
      if (req.params.subCat){
        subCategoria = req.params.subCat
      } else {
        subCategoria = ''
      }     
      res.render('../views/products/listado.ejs', {
          title: 'Listado Productos',
          categoria,
          subCategoria,
          mascota
      });
    },
    //rutas para perros/categoria/subcategoria
    subCategoryListController:(req, res) => {
      categoria = req.params.category;
      mascota = req.params.idMascota;
      if (req.params.subCat){
        subCategoria = req.params.subCat
      } else {
        subCategoria = ''
      }     
      res.render('../views/products/listado.ejs', {
          title: 'Listado Productos',
          categoria,
          subCategoria,
          mascota
      });
    },
   
};
  
module.exports = prodController;