const db = require("./database/models");

const petSizeService = {
    getAll: async function () {
        try {
            return await db.PetSize.findAll();
        } catch (error) {
            console.log(error);
            return res.status(500).send('No se puedo procesar la solicitud');
        }
    }
}

module.exports = petSizeService;