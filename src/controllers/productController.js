const fs = require('fs');

const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
//const productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

function getProducts() {
  return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const prodController = {
    indexProductController: (req, res) => {
      res.render ('../views/mascotas.ejs', {
        title: 'Mascotas'
      });
    },
    //controller ruta para ver detalle producto
    detailProductController:(req, res) => {
        idProducto = parseInt(req.params.id);
        if (idProducto === 1 ){
            res.render('../views/products/detalle-producto.ejs', {
                /* aqui se mandaria le objeto de cada articulo para hacerlo dinámico */
                title: 'Detalle producto',
            });
        }
    },
    //controller ruta para crear prod
    crearProdController:(req, res) => {
      res.render('../views/products/crear.ejs', {
          title: 'Crear producto',
      });
    },
    //controller ruta para eliminar producto
    eliminarController: (req, res) =>{
      const idProd = parseInt(req.params.id);
      const products = getProducts();
      newList = [];
      for (var i=0; i<=products.length-1; i++){
        idProducto = products[i].id;
        if (idProducto !== idProd) {
          newList.push(products[i]);
        }
      }
      fs.writeFileSync(productsFilePath, JSON.stringify(newList));
      res.redirect('/product');
    },
    //Controlador para editar prod -sole
    editarProdController:(req, res) => {
      const productos = getProducts();
      const id = parseInt(req.params.id);	
      const producto = productos.find((product)=> product.id == id);
  
      res.render("../views/products/editar.ejs", {producto});
    },

    //Controlador Guardar del crear Prod.
    guardarProd:(req, res) => {
      res.render ('../views/mascotas.ejs', {
        title: 'Mascotas'
      });
    },

    //Controlador Guardar del Editar -Sole
    updateProdController: (req, res) => {		
      const productos =getProducts();
      const {id} = req.params;

      let subCatFinal = "";
      
      if (req.body.subCat != "") {
        subCatFinal = req.body.subCat;
      } else if (req.body.subCatAcc != ""){
        subCatFinal = req.body.subCatAcc;
      };

      const esDestacado = (req.body.destacado === "true") ? "si" : "no";
                  
      const productToEdit = productos.findIndex((product)=> product.id ==id);
      productos[productToEdit].nombreProducto= req.body.nombreprod;
      productos[productToEdit].descripcion = req.body.descripcion;
      productos[productToEdit].precio = parseInt(req.body.precio);
      productos[productToEdit].descuento = parseInt(req.body.descuento);
      productos[productToEdit].mascota = req.body.mascota;
      productos[productToEdit].imagen = req.file ? req.file.filename : productos[productToEdit].imagen;
      productos[productToEdit].marca = req.body.marca;
      productos[productToEdit].edadMascota = req.body.edadmascota;
      productos[productToEdit].tamanioMascota = req.body.tamaniomascota;
      productos[productToEdit].destacado = esDestacado;
      productos[productToEdit].categoria = req.body.categoria;
      productos[productToEdit].subCategoria = subCatFinal;
      productos[productToEdit].presentacion = req.body.presentacion;
    
      fs.writeFileSync(productsFilePath, JSON.stringify(productos));  
      res.redirect("/product");          
    },
    //Controlador ruta /product/perros o /gatos
    productsListController:(req, res) => {
      categoria = ''
      subCategoria = '';
      mascota = req.params.idMascota;
      const products = getProducts();

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
    // Controlador ruta para perros/categoria o gatos/categoria
    CategoryListController:(req, res) => {
      categoria = req.params.category;
      mascota = req.params.idMascota;
      const products = getProducts();
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
    //Controlador rutas para perros/categoria/subcategoria o gatos/categoria/subcategoria
    subCategoryListController:(req, res) => {
      categoria = req.params.category;
      mascota = req.params.idMascota;
      const products = getProducts();

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