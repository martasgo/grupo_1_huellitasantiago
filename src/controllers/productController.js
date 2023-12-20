const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');

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
    //Controlador ruta para ver detalle producto
    detailProductController:(req, res) => {
        idProducto = parseInt(req.params.id);
        if (idProducto === 1 ){
            res.render('../views/products/detalle-producto.ejs', {
                /* aqui se mandaria le objeto de cada articulo para hacerlo dinámico */
                title: 'Detalle producto',
            });
        }
    },
    //Controlador ruta para crear prod
    crearProdController:(req, res) => {
      res.render('../views/products/crear.ejs', {
          title: 'Crear producto',
      });
    },
    //Controlador ruta para eliminar producto
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
    },
    //Controlador Ruta para almacenar el producto creado
    guardarProd:(req, res) => {
      // Creo el array de productos usando la función getProducts
      const products = getProducts();

      // Defino la variable que recibe la imagen del formulario
      const image = req.file ? req.file.filename : "default-image.png";

      // Defino la variable que evalúa si es un producto destacado
      const esDestacado = (req.body.destacado === "true") ? "si" : "no";

      // Variable para manejar subcateoría
      let subCatFinal = "";
      
      if (req.body.subCat != "") {
        subCatFinal = req.body.subCat;
      } else if (req.body.subCatAcc != ""){
        subCatFinal = req.body.subCatAcc;
      };

      // Defino la variable que guarda el producto creado desde el formulario
      const newProduct = {
        id: products[products.length-1].id + 1,
			  nombreProducto: req.body.nombreprod,
        descripcion: req.body.descripcion,
			  precio: parseInt(req.body.precio),
			  descuento: parseInt(req.body.descuento),
        mascota: req.body.mascota,
        imagen: image,
        marca: req.body.marca,
        edadMascota: req.body.edadmascota,
        tamanioMascota: req.body.tamaniomascota,
        destacado: esDestacado,
			  categoria: req.body.categoria,
			  subCategoria: subCatFinal,
        presentacion: req.body.presentacion
      };

      // Agrego el producto creado al array de productos
      products.push(newProduct);

      // Actualizo el JSON de productos luego de crear el producto
      fs.writeFileSync(productsFilePath , JSON.stringify(products), {
        flag:"w",
        encoding:"utf-8",
      });
        
      res.render ('../views/mascotas.ejs', {
        title: 'Mascotas'
      });
    },
    //Controlador para editar prod -sole
    editarProdController:(req, res) => {
      const productos = getProducts();
      const id = parseInt(req.params.id);	
      const producto = productos.find((product)=> product.id == id);
  
      res.render("../views/products/editar.ejs", {producto});
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