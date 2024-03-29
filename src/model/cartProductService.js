const db = require('./database/models');
const Op = db.Sequelize.Op;

const cartProductService = {
    // Método para agregar en la DB una orden de compra de un usuario
    create: async function (orderId, productsList) {
        try {
            productsList.forEach (product => {
                let orderDetail = {
                    // el id es autoincremental
                    id_shopping_cart: orderId,
                    id_product: product.id_product,
                    precio: product.precio,
                    cantidad: product.cantidad,
                    descuento: product.descuento
                };

                return db.CartProduct.create(orderDetail)
            });
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
        }
    },
    getByCartId: async function (cartID) {
        try {
            return await db.CartProduct.findAll({
                where: {
                    id_shopping_cart: cartID
                },
                include: ["product"]
            });
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
        }
    }
};

module.exports = cartProductService;