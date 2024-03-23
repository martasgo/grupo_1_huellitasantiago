const db = require('./database/models');
const Op = db.Sequelize.Op;
const fs = require("fs");
const path = require("path");

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

    // Service para obtener todos los productos agrupados de a "totalItems"(cantidad) productos
    // Sirve para aplicar en paginados
    getAllByGroup: async (page = 1, totalItems) => {
        try {
            const pageSize = totalItems; // Cantidad de productos por página
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
            return[]
            ;
        }
    },

    //Service para obtener productos con descuento
    getDescuento: async (req,res) => {
        try{
            return await db.Product.findAll({
                where: {                  
                    descuento:{[Op.gt]: 0}
                },
            })
        }catch (error) {
            console.log(error);
            return[]
            ;
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
    // Service para buscar producto por palabra clave
    getByKeyWord: async (word) => {
        try {
            let allProducts = await db.Product.findAll({
                where: {
                    nombre: {
                        [Op.like]: `%${word}%`
                    }
                }
            });
            return allProducts
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error en la solicitud');
        }
    },    

    // Service para borrar imagen en caso de creacion de producto con errores
    deleteImagen: function(img){
        let directorio = path.resolve(__dirname , "../../public/images/productos");
        const rutaImagen = path.join(directorio, img);
        fs.unlinkSync(rutaImagen);
    },

    // Service para aplicar los filtros que se muestran en la vista listado.ejs
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
    },

    // Service para actualizar el stock de un producto luego de una compra
    stockUpdate: async (productsList) => {
        try {
            const updateStockPromises = [];

            for (const product of productsList) {
                let prodId = product.id_product;
                let cantidad = product.cantidad;
                let productToUpdate = await productService.getByPk(prodId);
                let oldStock = productToUpdate.stock;
                let newStock = parseInt(oldStock) - parseInt(cantidad);
                let updatedStock = await db.Product.update(
                    {stock: newStock},
                    {where:{id: prodId}}
                );
                updateStockPromises.push(updatedStock);
            };
            
            await Promise.all(updateStockPromises);
            
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
        }
    },

    getByCategory: async function (idCat) {
        try {
            return await db.Product.findAll({
                where: {
                    id_categoria : idCat,
                }
            })
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
        }
    },

    getAllApiProducts: async () => {
        try {
            let alimentosProducts = await productService.getByCategory(1);
            let accesoriosProducts = await productService.getByCategory(2);
            let cuidadoHigieneProducts = await productService.getByCategory(3);
            let ropaProducts = await productService.getByCategory(4);
            let allProducts = await db.Product.findAll({
                include: ['categories']});
            let productsList = [];
            allProducts.forEach(product => {
                const productWithDetail = {
                    id: product.id,
                    name: product.nombre,
                    description: product.descripcion,
                    categories: product.categories,
                    detail: `localhost:3000/api/products/${parseInt(product.id)}`
                };
                productsList.push(productWithDetail);
            });
            // Iterar sobre las relaciones y convertirlas a arrays si son objetos
            for (let i = 0; i < productsList.length; i++) {
                const product = productsList[i];
                for (let key in product) {
                    if (typeof product[key] === 'object' && product[key] !== null && !Array.isArray(product[key])) {
                        // Si la propiedad es un objeto y no es nulo ni un array, conviértela a un array de un solo elemento
                        product[key] = [product[key]];
                    }
                }
            }
            let results = {
                count: allProducts.length,
                countByCategory: {
                    Alimentos: alimentosProducts.length,
                    Accesorios: accesoriosProducts.length,
                    Cuidado: cuidadoHigieneProducts.length,
                    Ropa: ropaProducts.length
                },
                products: productsList
            };
            return results
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
        }
        
    },

    getApiProductById: async (id) => {
        try {
            let product = await productService.getByPk(id);
            // Convertir las relaciones a un array en el objeto principal
            let productJSON = product.toJSON(); // Convierte el objeto Sequelize a JSON

            // Iterar sobre las relaciones y convertirlas a arrays si son objetos
            for (let key in productJSON) {
                if (Array.isArray(productJSON[key])) { // Si la propiedad ya es un array, continuar
                    continue;
                } else if (typeof productJSON[key] === 'object' && productJSON[key] !== null) { // Si la propiedad es un objeto, convertir a array
                    productJSON[key] = [productJSON[key]]; // Convertir el objeto a un array de un solo elemento
                }
            };
            const result = {
                id: productJSON.id,
                nombre: productJSON.nombre,
                descripcion: productJSON.descripcion,
                precio: productJSON.precio,
                descuento: productJSON.descuento,
                mascota: productJSON.pets[0].mascota,
                imagen: productJSON.imagen,
                marca: productJSON.brands[0].nombre_marca,
                edad_mascota: productJSON.pets_ages[0].edad,
                tamanio_mascota: productJSON.pets_sizes[0].tamanio,
                destacado: productJSON.destacado,
                categoria: productJSON.categories[0].nombre,
                subcategoria: productJSON.sub_categories !== null ? productJSON.sub_categories[0].nombre_sub_category : null,
                presentacion: productJSON.packages_sizes !== null ? productJSON.packages_sizes[0].cantidad + ' ' + productJSON.packages_sizes[0].unidad_medida : null,
                stock: productJSON.stock,
                pets_sizes: productJSON.pets_sizes,
                pets: productJSON.pets,
                pets_ages: productJSON.pets_ages,
                categories: productJSON.categories,
                sub_categories: productJSON.sub_categories,
                packages_sizes: productJSON.packages_sizes,
                brands: productJSON.brands,
                shopping_carts: productJSON.shopping_carts
            }
            return await result
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
        }  
    }
};

module.exports = productService;