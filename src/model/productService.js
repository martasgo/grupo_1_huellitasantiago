const db = require('./database/models');

const productService = {
    // Service para obtener todos los productos
    getAll: async (req, res) => {
        try {
            let allProducts =  await db.Product.findAll();
            return res.send(allProducts);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error en la solicitud');
        }
    },

    // Service para obtener un producto por ID
    getByPk: async (req, res) => {
        try {
            let id = parseInt(req.params.id);
            let productByPk = await db.Product.findByPk(id);
            return res.send(productByPk)
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error en la solicitud');
        }
    },

    // Service para obtener un producto por palabra clave en su nombre
    // Trae al primer producto que cumpla la condición. No a todos
    getOneByName: async (req, res) => {
        try {
            let palabra = 'para';
            let productByName = await db.Product.findOne(
                {where: {
                    nombre: {[db.Sequelize.Op.like]: '%'+palabra+'%'}
                }}
            );
            return res.send(productByName);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error en la solicitud');
        }
    },

    // Service para obtener todos los productos por palabra clave en su nombre
    // Trae a todos los que cumplan la condición. 
    // Esto podría servirnos para el search

    getAllByName: async (req, res) => {
        try {
            let palabra = 'para';
            let productsByName = await db.Product.findAll(
                {where: {
                    nombre: {[db.Sequelize.Op.like]: '%'+palabra+'%'}
                }}
            );
            return res.send(productsByName);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error en la solicitud');
        }
    },
    /* Servicio para agregar en la base un nvo producto */
    add: async function (prod) {
        try {
            // const pelicula = new Pelicula(body);
            return await db.Product.create(prod);
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = productService;