const db = require("./database/models");

const petSizeService = {
    getAll: async function () {
        try {
            return await db.PetSize.findAll();
        } catch (error) {
            console.log(error);
            throw new Error("No se pudo procesar la solicitud")
        }
    }
}

module.exports = petSizeService;