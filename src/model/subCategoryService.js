const db = require("./database/models");

const subCategoryService = {
    // Service para obtener todas las subcategorias
    getAll: async function () {
        try {
            return await db.ProductSubCategory.findAll();
        } catch (error) {
            console.log(error);
            return res.status(500).send('No se puedo procesar la solicitud');
        }
    },
    // Service para obtener subcategorias según el ID de la categoría
    getByCategoryId: async function (categoryId) {
        try {
            return await db.ProductSubCategory.findAll({
                where: {
                    id_category: categoryId
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send('No se puedo procesar la solicitud');
        }
    },
}

module.exports = subCategoryService;