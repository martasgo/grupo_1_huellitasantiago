const { Router } = require("express");
const productController = require("../controllers/productController");
const router = require("./mainRoute");
const path = require("path");
const multer = require("multer");

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
  detailProductRoute: "/detalle/:id",
  productCrear: "/crear",
  productEditar: "/editar/:id",
  productDelete: '/delete/:id',

  //listado productos: "/product/perros",  /product/gato/  
  productsList: "/:idMascota",
  productsListCat: "/:idMascota/:category",
  productsListSubcat: "/:idMascota/:category/:subCat",
};
// rutas para mostrar la categoria de mascotas y de ahi ver productos
routerProduct.get(routesProd.indexProductRoute, productController.indexProductController);

// rutas para ver detalle de producto
routerProduct.get(routesProd.detailProductRoute, productController.detailProductController);

// rutas para obtener form para crear productos
routerProduct.get(routesProd.productCrear, productController.crearProdController);
routerProduct.post(routesProd.indexProductRoute, upload.single("foto") , productController.guardarProd);

// rutas para obtener form para editar productos
routerProduct.get(routesProd.productEditar, productController.editarProdController); //sole get de editar
routerProduct.put(routesProd.productEditar,  upload.single('newImage'), productController.updateProdController); //sole put de editar

// rutas para eliminar producto
routerProduct.get(routesProd.productDelete, productController.eliminarController);

//rutas para mascota=perro o mascota=gato
routerProduct.get(routesProd.productsList, productController.productsListController);
routerProduct.get(routesProd.productsListCat, productController.CategoryListController);
routerProduct.get(routesProd.productsListSubcat, productController.subCategoryListController);

module.exports = routerProduct;