const db = require('./database/models');
const Op = db.Sequelize.Op;
const fs = require("fs");
const path = require("path");
const prodCategoryService = require('./prodCategoryService');

const productService = {
    // Service para obtener todos los productos
    getAll: async (req, res) => {
        try {
            let allProducts =  await db.Product.findAll();
            return allProducts;
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error en la solicitud');
        }
    },

    // Service para obtener todos los productos agrupados de a 5
    // Sirve para aplicar en paginados
    getAllByGroup: async (page = 1) => {
        try {
            const pageSize = 7; // Cantidad de productos por página
            const startIndex = (page - 1) * pageSize;
            const endIndex = page * pageSize;
    
            const allProducts = await db.Product.findAll({
                offset: startIndex,
                limit: pageSize,
            });
    
            return allProducts;
        } catch (error) {
            console.log(error);
            throw new Error('Error en la solicitud');
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
    getDestacados: async (req, res) => {
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
            return await db.Product.create(prod);
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
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
            throw new Error('No se pudo procesar la solicitud correctamente');
        }
    },
    getAllByCategory: async function (idPet, idCat ) {
        try {
            return await db.Product.findAll({
                where: {
                    id_mascota: { [Op.or]: idPet},
                    id_categoria : idCat,
                },
                order: [
                    ['nombre', 'ASC']
                ]
            })
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
        }
    },
    getAllBySubCategory: async function (idPet, idCat, idSubCat) {
        try {
            return await db.Product.findAll({
                where: {
                    id_mascota: { [Op.or]: idPet},
                    id_categoria : idCat,
                    id_sub_categoria : idSubCat
                },
                order: [
                    ['nombre', 'ASC']
                ]
            })
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
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
            throw new Error('No se pudo procesar la solicitud correctamente');
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
            throw new Error('No se pudo procesar la solicitud correctamente');
        }
    },

    // Service para borrar imagen en caso de creacion de producto con errores
    deleteImagen: function(img){
        let directorio = path.resolve(__dirname , "../../public/images/productos");
        const rutaImagen = path.join(directorio, img);
        fs.unlinkSync(rutaImagen);
    },
    getAllByFileters: async function(filtros, valorMascota, valorCat, valorSubCat){
        let query = {
            where: {}
          };
          
        if (valorMascota){
            query.where.id_mascota = {[Op.or]: valorMascota } 
        }

        if (valorCat){
            query.where.id_categoria = valorCat.id 
        }

        if (valorSubCat){
            query.where.id_sub_categoria = valorSubCat.id 
        }
        
        if (filtros.marca) {
            if (Array.isArray(filtros.marca)){ 
                query.where.id_marca = {[Op.or]: filtros.marca } 
            } else {
                query.where.id_marca = filtros.marca 
            } 
        }
        if (filtros.edad) {
            if (Array.isArray(filtros.edad)){ 
                query.where.id_edad_mascota = {[Op.or]: filtros.edad } 
            }else{
                query.where.id_edad_mascota = filtros.edad
            }
        }
        if (filtros.tamanio){
            if (Array.isArray(filtros.tamanio)){ 
                query.where.id_tamanio_mascota = {[Op.or]: filtros.tamanio } 
            } else {
                query.where.id_tamanio_mascota = filtros.tamanio
            }
        } 
        if (filtros.precioDesde !== '' && filtros.precioHasta !== '' ) {
            query.where.precio = {
                //sequelize.literal('precio > (precio - (precio * (descuento / 100)))'), // Calculamos el precio con descuento
                [Op.gte]: parseInt(filtros.precioDesde),
                [Op.lte]: parseInt(filtros.precioHasta)
            } 
        } else if (filtros.precioDesde !== ''){
            {query.where.precio = { [Op.gte]: parseInt(filtros.precioDesde) } }
        }else if (filtros.precioHasta !== ''){
            query.where.precio = {[Op.lte]: parseInt(filtros.precioHasta) }
        }

        try {   
            console.log(query)
            return await db.Product.findAll(query);
            
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
        }
    }
};

module.exports = productService;