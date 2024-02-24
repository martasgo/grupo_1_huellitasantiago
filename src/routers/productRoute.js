const { Router } = require("express");
// IMPORTO EL SERVICE DE PRODUCT
const productService = require('../model/productService');
const productController = require("../controllers/productController");
const router = require("./mainRoute");
const path = require("path");
const multer = require("multer");
const authMiddleware = require ("../middlewares/authMiddleware");
const adminMiddleware = require ("../middlewares/adminMiddleware");
const productValidations = require ("../middlewares/productValidations");


// Multer - manejo del almacenamiento
const storage = multer.diskStorage({
	destination: (req , file , cb) => {
		cb (null , path.resolve(__dirname , "../../public/images/productos"));
	},
	filename: (req , file , cb) => {
		cb (null , file.fieldname + "-" + Date.now() + path.extname(file.originalname))
	}
});

// Instanciar multer para manejar los métodos
const upload = multer ({ storage });

const routerProduct = Router();

const routesProd = {
  indexProductRoute: "/",
  list: '/list',
  detailProductRoute: "/detalle/:id",
  productCrear: "/crear",
  productEditar: "/editar/:id",
  productDelete: '/delete/:id',
  productFilters: "/filtros/:idMascota/:idCat?/:idSubCat?",

  //listado productos: "/product/perros",  /product/gato/  
  productsList: "/:idMascota",
  productsListCat: "/:idMascota/:category",
  productsListSubcat: "/:idMascota/:category/:subCat",
};

// rutas para mostrar la categoria de mascotas y de ahi ver productos
routerProduct.get(routesProd.indexProductRoute, productController.indexProductController);

// ruta para obtener el listado completo de productos
routerProduct.get(routesProd.list, authMiddleware , adminMiddleware, productController.list);

// rutas para ver detalle de producto
routerProduct.get(routesProd.detailProductRoute, productController.detailProductController);

// rutas para obtener form para crear productos
routerProduct.get(routesProd.productCrear, authMiddleware , adminMiddleware , productController.crearProdController);
routerProduct.post(routesProd.productCrear, authMiddleware , adminMiddleware , upload.single("foto") , productValidations, productController.guardarProd);

// rutas para obtener form para editar productos
routerProduct.get(routesProd.productEditar, authMiddleware , adminMiddleware , productController.editarProdController); //sole get de editar
routerProduct.put(routesProd.productEditar, authMiddleware , adminMiddleware ,  upload.single('newImage'), productValidations, productController.updateProdController); //sole put de editar

// rutas para eliminar producto
routerProduct.get(routesProd.productDelete, authMiddleware , adminMiddleware , productController.eliminarController);

//filtros 
routerProduct.post(routesProd.productFilters, productController.filtersApplied);

//rutas para mascota=perro o mascota=gato
routerProduct.get(routesProd.productsList, productController.productsListController);
routerProduct.get(routesProd.productsListCat, productController.CategoryListController);
routerProduct.get(routesProd.productsListSubcat, productController.CategoryListController);
//routerProduct.get(routesProd.productsListSubcat, productController.subCategoryListController);

module.exports = routerProduct;