const db = require("./database/models");

const brandService = {
    getAll: async function () {
        try {
            return await db.Brand.findAll();
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

module.exports = brandService;