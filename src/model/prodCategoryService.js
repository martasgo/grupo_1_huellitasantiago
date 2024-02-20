const db = require("./database/models");

const prodCategoryService = {
    getAll: async function () {
        try {
            return await db.ProductCategory.findAll();
        } catch (error) {
            console.log(error);
            return [];
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
            return error;
        }
    },
}

module.exports = prodCategoryService;