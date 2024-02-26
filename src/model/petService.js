const db = require("./database/models");
const Op = db.Sequelize.Op;

const petService = {
    getAll: async (req, res) => {
        try {
            return await db.Pet.findAll();
           // res.send(mascotas);
        } catch (error) {
            console.log(error);
            throw new Error("No se pudo procesar la solicitud")
        }
    },
    getByMascota:async (mascota) => {
        try {
            return await db.Pet.findAll({
            where: {
                mascota: {[Op.like]:'%'+mascota+'%'}
            }
         })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = petService;