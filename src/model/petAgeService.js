const db = require("./database/models");

const petAgeService = {
    getAll: async function () {
        try {
            return await db.PetAge.findAll();
        } catch (error) {
            console.log(error);
            throw new Error("No se pudo procesar la solicitud")
        }
    }
}

module.exports = petAgeService;