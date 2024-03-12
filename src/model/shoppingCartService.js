const db = require('./database/models');
const Op = db.Sequelize.Op;
const sequelize = require("sequelize");

const shoppingCartService = {
    getAll:async function () {
        try {
            return await db.ShoppingCart.findAll({
                include: ["cartProduct", "users"],
                order: [
                    ['fecha', 'DESC']
                ]
            });
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
        }
    },
    // Método para agregar en la DB una orden de compra de un usuario
    create: async function (orderForDB) {
        try {
            return await db.ShoppingCart.create(orderForDB);
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
        }
    },
    getByPk: async function (id) {
        try {
            return await db.ShoppingCart.findByPk(id,{
                include: ["cartProduct"]
            });
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
        }
    },
    getByUser: async function (userId) {
        try {
            return await db.ShoppingCart.findAll({
                where: {
                    id_cliente: userId
                },
                include: ["cartProduct"],
                order: [
                    ['fecha', 'DESC']
                ]
            });
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
        }
    }
};

module.exports = shoppingCartService;