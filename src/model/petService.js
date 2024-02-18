const db = require("./database/models");

const petService = {
    getAll: async (req, res) => {
        try {
            return await db.Pet.findAll();
           // res.send(mascotas);
        } catch (error) {
            console.log(error);
            return res.status(500).send('No se puedo procesar la solicitud');
        }
    }
}

module.exports = petService;