const db = require('./database/models');
const Op = db.Sequelize.Op;

const cartProductService = {
    // Método para agregar en la DB una orden de compra de un usuario
    create: async function (order) {
        try {
            return await db.CartProduct.create(order);
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
                }
            });
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
        }
    }
};

module.exports = cartProductService;