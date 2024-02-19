const db = require('./database/models');
const Op = db.Sequelize.Op;

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

    // Service para obtener un producto por su ID con sus relaciones
    getByPk: async (id) => {
        try {
            return await db.Product.findByPk(id, {
                include: 
                [
                "pets_sizes",
                "pets",
                'pets_ages',
                'categories',
                'sub_categories',
                'packages_sizes',
                'brands',
                'shopping_carts']
            });
            
        } catch (error) {
            console.log(error);
        }
    },

    // Service para obtener todos los productos destacados
    getDestacados: async () => {
        try {
            return await db.Product.findAll({
                where: {
                    destacado: 1
                },
                order: [
                    ['nombre', 'ASC']
                ]
            })
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
            return res.status(500).send('No se pudo procesar la solicitud correctamente');
        }
    },
    getAllByMascotas: async function (listado) {
        try {
            return await db.Product.findAll({
                where: {
                    id_mascota: { [Op.or]: listado}
                },
                order: [
                    ['nombre', 'ASC']
                ]
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send('No se pudo procesar la solicitud correctamente');
        }
    },
    getAllByCategory: async function (idPet, idCat) {
        try {
            return await db.Product.findAll({
                where: {
                    id_mascota: { [Op.or]: idPet},
                    id_categoria : idCat
                },
                order: [
                    ['nombre', 'ASC']
                ]
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send('No se pudo procesar la solicitud correctamente');
        }
    },

    // Service para modificar un producto por su ID
    updateById: async (prod, id) => {
        try {
            return await db.Product.update(prod,
                {where:{
                    id:id
                }})
        } catch (error) {
            console.log(error);
        }
    },

    // Service para eliminar un producto por su ID
    destroyById: async(id) => {
        try {
            const result = await db.Product.destroy({
                where: {
                    id: id
                }
            });
            return result;
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error en la solicitud');
        }
    }
};

module.exports = productService;