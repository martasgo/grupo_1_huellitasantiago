const db = require("./database/models");

const prodCategoryService = {
    getAll: async function () {
        try {
            return await db.ProductCategory.findAll();
        } catch (error) {
            console.log(error);
            return res.status(500).send('No se puedo procesar la solicitud');
        }
    },
    getByField: async function (categoria){
        try {
            return await db.ProductCategory.findOne({
                where: {
                    nombre: categoria
                }
            });
            
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error en la solicitud');
        }
    },
}

module.exports = prodCategoryService;