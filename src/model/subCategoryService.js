const db = require("./database/models");

const subCategoryService = {
    // Service para obtener todas las subcategorias
    getAll: async function () {
        try {
            return await db.ProductSubCategory.findAll();
        } catch (error) {
            console.log(error);
            throw new Error("No se pudo procesar la solicitud")
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
            throw new Error("No se pudo procesar la solicitud")
        }
    },
    getByField: async function (datoSubCat, categoriaId){
        try {
            return await db.ProductSubCategory.findOne({
                where: {
                    nombre_sub_category: datoSubCat,
                    id_category: categoriaId
                }
            });
            
        } catch (error) {
            console.log(error);
            throw new Error("No se pudo procesar la solicitud")
        }
    }
}

module.exports = subCategoryService;