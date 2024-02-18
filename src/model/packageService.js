const db = require("./database/models");

const packageService = {
    getAll: async function () {
        try {
            return await db.PackageSize.findAll();
        } catch (error) {
            console.log(error);
            return res.status(500).send('No se puedo procesar la solicitud');
        }
    }
}

module.exports = packageService;