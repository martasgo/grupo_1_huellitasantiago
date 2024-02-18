const db = require("./database/models");

const subCategoryService = {
    getAll: async function () {
        try {
            return await db.ProductSubCategory.findAll();
        } catch (error) {
            console.log(error);
            return res.status(500).send('No se puedo procesar la solicitud');
        }
    }
}

module.exports = subCategoryService;