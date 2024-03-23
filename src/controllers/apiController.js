//SERVICIOS
const productService = require('../model/productService');
const shoppingCartService = require ('../model/shoppingCartService');
const cartProductService = require ('../model/cartProductService');

const apiController = {

    allProducts: async (req, res) => {
        try {
            let results = await productService.getAllApiProducts();
            return res.json(results);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
            return res.json([]);
        }
    },

    productById: async (req, res) => {
        try {
            let productJSON = await productService.getApiProductById(req.params.id)
            return res.json(productJSON);
        } catch (error) {
            console.error("Error al obtener el producto:", error);
            return res.json([]);
        }     
    },

    checkout: async (req, res) => {
        try {
            let orderFromUser = req.body;

            /* INSERTAR EL REGISTRO EN LA TABLA SHOPPING CARTS */
            let createdOrder = await shoppingCartService.create(req.session.userLogged.id, orderFromUser);

            /* GUARDAR EN UNA VARIABLE EL ARRAY DE PRODUCTOS QUE VIENE POR POST */
            let productsList = orderFromUser.productos;
           
            /* POR CADA PRODUCTO DEL ARRAY, SE CREA UN REGISTRO EN LA TABLA CART PRODUCT */
            let orderDetail = await cartProductService.create(createdOrder.id,productsList);

            /* ACTUALIZAR EL STOCK DE LOS PRODUCTOS COMPRADOS */
            productService.stockUpdate(productsList);

            /* COMPROBAR CON UN JSON LA INFORMACIÓN QUE VIENE POR POST */
            res.json({ success: true, message: 'Compra realizada con éxito', orderFromUser, createdOrder, orderDetail });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }
    }
};

module.exports = apiController;