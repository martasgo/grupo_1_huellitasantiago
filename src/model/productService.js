const db = require('./database/models');
const Op = db.Sequelize.Op;
const fs = require("fs");
const path = require("path");

//import otros services de tablas secundarios
const brandService = require('../model/brandService');
const packageService = require('../model/packageService');
const petAgeService = require('../model/petAgeService');
const petService = require('../model/petService');
const prodCategoryService = require('../model/prodCategoryService');
const subCategoryService = require('../model/subCategoryService');
const petSizeService = require('../model/petSizeService');

const productService = {
    // Service para obtener todos los productos
    getAll: async (req, res) => {
        try {
            let allProducts =  await db.Product.findAll({
                where: {
                  activo: 1
                }
              });
            return allProducts;
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error en la solicitud');
        }
    },
 
    getAllServices: async () => {
        try {
            let brandList = await brandService.getAll();
            let petList = await petService.getAll();
            let petAgeList = await petAgeService.getAll();
            let petSizeList = await petSizeService.getAll();
            let categoryList = await prodCategoryService.getAll();
            let subCategoryList = await subCategoryService.getAll();
            let packageList = await packageService.getAll();
            let subCategoryAlimentosList = await subCategoryService.getByCategoryId(1);
            let subCategoryAccesoriosList = await subCategoryService.getByCategoryId(2);

            return {brandList, petList, petAgeList, petSizeList, categoryList, subCategoryList, packageList, subCategoryAlimentosList, subCategoryAccesoriosList};
        } catch (error) {
            console.log(error);
            throw new Error('Error en la solicitud para obtener los servicios:', error);
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
                order: [
                    ['nombre', 'ASC']
                ]
            });
    
            return allProducts;
        } catch (error) {
            console.log(error);
            throw new Error('Error en la solicitud');
        }
    },

    //Service para paginacion
    getPagination: async (page) =>{
        try {
            const allProducts = await productService.getAllByGroup(page, 5);
  
            // Obtener el número total de productos para calcular el número total de páginas
            // TODO ver si podemos reemplazar por productService.getAll, result.length()
            const totalProducts = await db.Product.count();
            const totalPages = Math.ceil(totalProducts / 5); // Uso la misma cantidad de pagesize usada en el servicio
            
            return {allProducts, totalPages};
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
            return[]
        }
    },

    // Service para obtener todos los productos destacados
    getDestacados: async (req, res) => {
        try {
            return await db.Product.findAll({
                where: {
                    destacado: 1,
                    activo: 1
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
                    activo:1,                  
                    descuento:{[Op.gt]: 0}
                },
            })
        }catch (error) {
            console.log(error);
            return[]
            ;
        }     
   },
    /* Servicio para gestionar los datos para el alta de un producto llamando al servicio add*/
   createProdInfo: async (req) => {
    try {
        // Defino la variable que recibe la imagen del formulario
        const image = req.file ? req.file.filename : "default-image.png";

        // Defino la variable que evalúa si es un producto destacado
        const esDestacado = (req.body.destacado === "true") ? 1 : 0;

        // Variable para manejar subcategoría
        let subCatFinal = "";
        if (req.body.subCat != "") {
            subCatFinal = parseInt(req.body.subCat);
        } else if (req.body.subCatAcc != ""){
            subCatFinal = parseInt(req.body.subCatAcc);
        } else {
            subCatFinal = null
        };

        // Variable para manejar si viene o no una presentacion
        if (req.body.presentacion != "") {
            presentacionFinal = parseInt(req.body.presentacion);
        } else {
            presentacionFinal = null
        }

        // Defino la variable que guarda el producto creado desde el formulario
        const newProduct = {
                nombre: req.body.nombreprod,
                descripcion: req.body.descripcion,
                precio: parseInt(req.body.precio),
                descuento: parseInt(req.body.descuento),
                id_mascota: parseInt(req.body.mascota),
                imagen: image,
                id_marca: parseInt(req.body.marca),
                id_edad_mascota: parseInt(req.body.edadmascota),
                id_tamanio_mascota: parseInt(req.body.tamaniomascota),
                destacado: esDestacado,
                id_categoria: parseInt(req.body.categoria),
                id_sub_Categoria: subCatFinal,
                id_presentacion: presentacionFinal,
                stock: parseInt(req.body.stock),
                activo: 1
        };    
        return productService.add(newProduct);
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo procesar la solicitud correctamente');
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

    /* Service para buscar producto en función de mascota/categoria/subcategoria*/
    getBusqueda: async (dataMascota, dataCat, dataSubCat) =>{
        try {
            if (dataMascota){
                let mascotasLista = await petService.getByMascota(dataMascota);
                if (mascotasLista) {
                    let indicesMascotas = []
                    indicesMascotas = mascotasLista.map(({ id }) => id);
                    if (dataCat) {
                        let categoriaResult = await prodCategoryService.getByField(dataCat);
                        if (categoriaResult) {
                            let indiceCat = categoriaResult.id;
                            if (dataSubCat) {
                                // SI VIENE subCATEGORIA
                                //busco el id de la subcategoria + id de la categoria
                                let resultSubCat = await subCategoryService.getByField(subCategoria, indiceCat);
                                let indiceSubCat = resultSubCat.id
                                return await productService.getAllBySubCategory(indicesMascotas, indiceCat, indiceSubCat)
                            } else {
                                 //SI NO VIENE SUB-CATEGORIA
                                return await productService.getAllByCategory(indicesMascotas, indiceCat);
                            }
                        }
                    } else {
                        //no viene categoria
                        return productService.getAllByMascotas(indicesMascotas)
                    }
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
        }
    },

    getAllByMascotas: async function (listado) {
        try {
            return await db.Product.findAll({
                where: {
                    activo:1,
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
                    activo: 1,
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
                    activo: 1,
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

    //Service para armar el objeto del producto para realizar el update
    editProdInfo: async (req, editProd) =>{
        try {
            // Capturo el ID del producto
            let idProd = parseInt(req.params.id);
            
            // Defino la variable que recibe la imagen del formulario
            const image = req.file ? req.file.filename : editProd.imagen;

            // Defino la variable que evalúa si es un producto destacado
            const esDestacado = (req.body.destacado === "true") ? 1 : 0;

            // Variable para manejar subcategoría
            let subCatFinal = "";
            if (parseInt(req.body.categoria) == 1) {
            if (req.body.subCat == "") {
                subCatFinal = null
            } else {
                subCatFinal = parseInt(req.body.subCat);
            }
            } else if (parseInt(req.body.categoria) == 2) {
            if (req.body.subCatAcc == "") {
                subCatFinal = null
            } else {
                subCatFinal = parseInt(req.body.subCatAcc);
            }
            } else {
            subCatFinal = null
            }

            // Variable para manejar si viene o no una presentacion
            let presentacionFinal = "";
            if (parseInt(req.body.categoria) == 1) {
            if (req.body.presentacion == "") {
                presentacionFinal = null
            } else {
                presentacionFinal = req.body.presentacion;
            }
            } else {
            presentacionFinal = null
            };

            // Defino la variable que guarda el producto editado desde el formulario
            const modifiedProduct = {
            nombre: req.body.nombreprod,
            descripcion: req.body.descripcion,
            precio: parseInt(req.body.precio),
            descuento: parseInt(req.body.descuento),
            id_mascota: parseInt(req.body.mascota),
            imagen: image,
            id_marca: parseInt(req.body.marca),
            id_edad_mascota: parseInt(req.body.edadmascota),
            id_tamanio_mascota: parseInt(req.body.tamaniomascota),
            destacado: esDestacado,
            id_categoria: parseInt(req.body.categoria),
            id_sub_categoria: subCatFinal,
            id_presentacion: presentacionFinal,
            stock: parseInt(req.body.stock),
            activo: parseInt(req.body.estado)
            };    

            // Incorporo a la DB el producto editado y redirecciono a product
            return await productService.updateById(modifiedProduct, idProd);
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud de edición de producto correctamente');  
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
            const result = await db.Product.update(
                {activo: 0},
                {
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
                    activo: 1,
                    nombre: {
                        [Op.like]: `%${word}%`
                    }
                }
            });
            return allProducts
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
        }
    },    

    // Service para borrar imagen en caso de creacion de producto con errores
    deleteImagen: async (img) => {
        try {
            let directorio = path.resolve(__dirname , "../../public/images/productos");
            const rutaImagen = path.join(directorio, img);
            fs.unlinkSync(rutaImagen);
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo borrar la imagen de producto');
        }
        
    },

    // Service para obtener los filtros seleccionados
    getFilterSelected: async (req) => {
        try {
            idCategory ='';
            idSubCategory ='';
            if (req.params.idMascota) {
               mascota = req.params.idMascota
               idPetList = await petService.getByMascota(mascota)
               indices = idPetList.map(({ id }) => id);
            }
            
            if (req.params.idCat) {
               categoria = req.params.idCat.replace(/-/g, ' ');
               idCategory = await prodCategoryService.getByField(categoria);
            }
            
            if (req.params.idSubCat) {
               subCategoria = req.params.idSubCat.replace(/-/g, ' ')
               id = idCategory.id;
               idSubCategory = await subCategoryService.getByField(subCategoria, idCategory.id)
            }

            return ({mascota, indices, categoria, subCategoria, idCategory, idSubCategory })
        } catch (error) {
            
        }
    },

    // Service para aplicar los filtros que se muestran en la vista listado.ejs
    getAllByFileters: async function(filtros, valorMascota, valorCat, valorSubCat){
        let query = {
            where: {}
          };
        
        query.where.activo = 1;

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
    stockUpdate: async (nuevoStock, productId) => {
        try {
            return await db.Product.update(
                {stock: nuevoStock},
                {where:{id: productId}}
            )
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo procesar la solicitud correctamente');
        }
    },
};

module.exports = productService;