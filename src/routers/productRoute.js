const { Router } = require("express");
const productController = require("../controllers/productController");
const router = require("./mainRoute");

const routerProduct = Router();

const multer = require('multer')
const path=require("path");


//Multer-Manejo de almacenamiento
const storage =multer.diskStorage({
    destination: (req, file, cb)=>{
    cb(null, path.resolve(__dirname, "../../public/images/productos/"));
    },
    filename: (req, file, cb)=>{
    cb(null, Date.now() + "-"+ file.originalname);
    }
});

// Instancia del multer para manejar los métodos
const upload = multer({storage: storage});


const routesProd = {
  indexProductRoute: "/",
  detailProductRoute: "/detalle/:id",
  productCrear: "/crear",
  productEditar: "/editar/:id",

  //listado productos: "/product/perros",  /product/gato/  
  productsList: "/:idMascota",
  productsListCat: "/:idMascota/:category",
  productsListSubcat: "/:idMascota/:category/:subCat",
};



routerProduct.get(routesProd.indexProductRoute, productController.indexProductController);
routerProduct.get(routesProd.detailProductRoute, productController.detailProductController);


// rutas para obtener form para crear/editar productos
routerProduct.get(routesProd.productCrear, productController.crearProdController);
routerProduct.post(routesProd.indexProductRoute, productController.guardarProd); 

routerProduct.get(routesProd.productEditar, productController.editarProdController); //sole get de editar
routerProduct.put(routesProd.productEditar,  upload.single('newImage'), productController.updateProdController); //sole put de editar

//rutas para mascota=perro o mascota=gato
routerProduct.get(routesProd.productsListCat, productController.CategoryListController);
routerProduct.get(routesProd.productsListSubcat, productController.subCategoryListController);
routerProduct.get(routesProd.productsList, productController.productsListController);



module.exports = routerProduct;