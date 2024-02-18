const db = require("./database/models");

const petAgeService = {
    getAll: async function () {
        try {
            return await db.PetAge.findAll();
        } catch (error) {
            console.log(error);
            return res.status(500).send('No se puedo procesar la solicitud');
        }
    }
}

module.exports = petAgeService;