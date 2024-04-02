//SERVICIOS
const productService = require('../model/productService');
const shoppingCartService = require ('../model/shoppingCartService');
const cartProductService = require ('../model/cartProductService');
const userService = require ('../model/userService');

const apiController = {

    allProducts: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1; // Página predeterminada: 1
            const pageItems = parseInt(req.query.pageItems) || 10; // Cantidad de items por página predeterminado: 10
            let results = await productService.getAllApiProducts(page, pageItems);
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

    lastProduct: async (req, res) => {
        try {
            let lastProduct = await productService.getLastProduct();
            return res.json(lastProduct);
        } catch (error) {
            console.error("Error al obtener el producto:", error);
            return res.json([]);
        }     
    },

    sales: async (req, res) => {
        try {
            let result = await shoppingCartService.sales()
            return res.json(result);
        } catch (error) {
            console.error("Error al obtener el producto:", error);
            return res.json([]);
        }     
    },

    cartProduct: async (req, res) => {
        try {
            let product = await productService.getByPk(req.params.id)
            return res.json(product);
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
    },

    allUsers: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1; // Página predeterminada: 1
            const pageUsers = parseInt(req.query.pageUsers) || 2; // Cantidad de items por página predeterminado: 8
            let response = await userService.getAllApiUsers(page, pageUsers);
            return res.json(response)
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
            return res.json([])
        }
    },

    userById: async (req, res) => {
        try {
            let response = await userService.getApiUserByPk(req.params.id);
            return res.json(response)
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            return res.json([])
        }
    },

    lastUser: async (req, res) => {
        try {
            let lastUser = await userService.getLastUser()
            return res.json(lastUser);
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            return res.json([]);
        }     
    },
};

module.exports = apiController;