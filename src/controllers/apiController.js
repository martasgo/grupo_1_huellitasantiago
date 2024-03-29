//SERVICIOS
const productService = require('../model/productService');
const shoppingCartService = require ('../model/shoppingCartService');
const cartProductService = require ('../model/cartProductService');

const apiController = {

    allProducts: async (req, res) => {
        let products = await productService.getAll();
        return res.json(products)
    },

    productById: async (req, res) => {
        let product = await productService.getByPk(req.params.id);
        return res.json(product)
    },

    checkout: async (req, res) => {
        try {
            /* GUARDAR EN UNA VARIABLE LA ORDEN QUE VIENE POR POST DESDE EL INDEX CARRITO */
            let orderFromUser = req.body;
            
            /* DE LA VARIABLE ANTERIOR, TOMAR SOLO LOS DATOS QUE SIRVAN PARA INSERTAR EL REGISTRO EN LA TABLA SHOPPING CARTS, Y GUARDARLOS EN UNA VARIABLE*/
            let orderForDB = {
                id_cliente: parseInt(req.session.userLogged.id),
                cantidad_productos: parseInt(orderFromUser.cantidad_productos),
                monto_total: parseFloat(orderFromUser.monto_total),
                fecha: orderFromUser.fecha
            };

            /* INSERTAR EL REGISTRO EN LA TABLA SHOPPING CARTS */
            let createdOrder = await shoppingCartService.create(orderForDB);

            /* GUARDAR EN UNA VARIABLE EL ARRAY DE PRODUCTOS QUE VIENE POR POST */
            let productsList = orderFromUser.productos;
           
            /* POR CADA PRODUCTO DEL ARRAY, SE CREA UN REGISTRO EN LA TABLA CART PRODUCT */
            productsList.forEach (product => {
                let orderDetail = {
                    // el id es autoincremental
                    id_shopping_cart: createdOrder.id,
                    id_product: product.id_product,
                    precio: product.precio,
                    cantidad: product.cantidad,
                    descuento: product.descuento
                };

                return cartProductService.create(orderDetail)
            });

            /* COMPRUEBO CON UN JSON LA INFORMACIÓN QUE VIENE POR POST */
            res.json({ success: true, message: 'Compra realizada con éxito', orderFromUser, orderForDB });

            /* ACTUALIZAMOS EL STOCK DE LOS PRODUCTOS COMPRADOS */
            const updateStockPromises = [];

            for (const product of productsList) {
                let prodId = product.id_product;
                let cantidad = product.cantidad;
                let productToUpdate = await productService.getByPk(prodId);
                let oldStock = productToUpdate.stock;
                let newStock = parseInt(oldStock) - parseInt(cantidad);
                updateStockPromises.push(productService.stockUpdate(newStock, prodId));
            };
            
            await Promise.all(updateStockPromises);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }
    }
};

module.exports = apiController;