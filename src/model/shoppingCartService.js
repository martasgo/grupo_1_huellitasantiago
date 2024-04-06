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
    create: async function (userId, order) {
        try {
            let orderForDB = {
                id_cliente: parseInt(userId),
                cantidad_productos: parseInt(order.cantidad_productos),
                monto_total: parseFloat(order.monto_total),
                fecha: order.fecha
            }
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
    },

    sales: async () => {
        try {
            let allSoldProducts = await db.CartProduct.findAll({
                include: ['product'],
                attributes: ['id_product', [sequelize.fn('SUM', sequelize.col('cantidad')), 'total_cantidad']],
                group: ['id_product'],
                order: sequelize.literal('total_cantidad DESC'),
                limit: 5
            });
            let totalSoldProducts = await db.CartProduct.findAll({
                include: ['product'],
                attributes: ['id','id_product'],
                order: [['id', 'DESC']]
            })
            totalSoldProducts = totalSoldProducts.reduce((unique, item) => {
                return unique.some(i => i.id_product === item.id_product) ? unique : [...unique, item];
            }, []);
            let lastSoldProducts = {
                first: totalSoldProducts[0],
                second: totalSoldProducts[1],
                third: totalSoldProducts[2],
                fourth: totalSoldProducts[3],
                fifth: totalSoldProducts[4],
            }
            let allSales = await db.ShoppingCart.findAll();
            let totalSoldItems = 0;
            let totalSalesAmount = 0;
            let totalNumberSales = allSales.length;
            allSales.forEach(sale => {
                totalSoldItems += sale.cantidad_productos;
                totalSalesAmount += Number(sale.monto_total)
            })
            let salesData = {
                totalNumberSales : totalNumberSales,
                totalItems: totalSoldItems,
                totalSales: totalSalesAmount,
                totalProducts: allSoldProducts,
                lastSoldProducts: lastSoldProducts
            }
            return salesData
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
        }
    }
};

module.exports = shoppingCartService;