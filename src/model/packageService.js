const db = require("./database/models");

const packageService = {
    getAll: async function () {
        try {
            return await db.PackageSize.findAll();
        } catch (error) {
            console.log(error);
            throw new Error("No se puedo realizar la búsqueda de los tamaños")
        }
    }
}

module.exports = packageService;