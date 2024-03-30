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
    
    //Service para paginacion
    getPagination: async (page, allItems, itemsPerPage ) =>{
        try {
            //const allProducts = await productService.getAllByGroup(page, 5);
            // Obtener el número total de productos para calcular el número total de páginas
            // const totalProducts = await db.Product.count();
            const pageSize = itemsPerPage; // Cantidad de productos por página
            const startIndex = (page - 1) * pageSize;
            const endIndex = page * pageSize;
            let allProducts = [];

            if (allItems === 1) {
                // veo de traer todos los productos activos y no (eliminados logicamente)
                allProducts = await db.Product.findAll({
                    offset: startIndex,
                    limit: pageSize,
                    order: [
                        ['nombre', 'ASC']
                    ]
                });
                productTable = await db.Product.findAll();
            } else {
                // veo de traer solo los productos activos
                allProducts = await db.Product.findAll({
                    activo: 1,
                    offset: startIndex,
                    limit: pageSize,
                    order: [
                        ['nombre', 'ASC']
                    ]
                });
                productTable = await productService.getAll();
            }
    
            let totalProducts = productTable.length;
            const totalPages = Math.ceil(totalProducts / itemsPerPage); // Uso la misma cantidad de pagesize usada en el servicio
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
            where: {},
            order: [
                ['nombre', 'ASC']
            ]
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
            // return await db.Product.findAll(query);
            resultado = await db.Product.findAll(query);

            // Filtrar los productos con descuento
            let productosConDescuento = resultado.filter(producto => producto.descuento);

            // Filtrar los productos sin descuento
            let productosSinDescuento = resultado.filter(producto => !producto.descuento);           

            productosConDescuento = productosConDescuento.filter(producto => {
                valor = (producto.precio - (producto.precio * (producto.descuento / 100)));
                if (filtros.precioDesde !== '' && filtros.precioHasta !== '' ) {
                   if (parseInt(filtros.precioDesde) < valor && valor < parseInt(filtros.precioHasta)) {
                        productosSinDescuento.push(producto);
                   } 
                } else if (filtros.precioDesde !== ''){
                    if (parseInt(filtros.precioDesde) <= valor){
                        productosSinDescuento.push(producto);
                    }
                }else if (filtros.precioHasta !== ''){
                    if (valor <= parseInt(filtros.precioHasta)){
                        productosSinDescuento.push(producto);
                    }
                }
            });            
            return productosSinDescuento;
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

    getAllApiProducts: async (page = 1, pageItems = 10) => {
        try {
            const offset = (page - 1) * pageItems;
            let alimentosProducts = await productService.getByCategory(1);
            let accesoriosProducts = await productService.getByCategory(2);
            let cuidadoHigieneProducts = await productService.getByCategory(3);
            let ropaProducts = await productService.getByCategory(4);
            let allProducts = await db.Product.findAll({
                include: ['categories'],
                limit: pageItems,
                offset: offset});
            // Obtener el total de productos
            const totalCount = await db.Product.count();
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

            // Calcular valores para next y previous
            const totalPages = Math.ceil(totalCount / pageItems);
            const nextPage = page < totalPages ? page + 1 : null;
            const previousPage = page > 1 ? page - 1 : null;

            // Construir las URLs de next y previous
            const baseUrl = 'localhost:3000/api/products';
            const nextUrl = nextPage ? `${baseUrl}?page=${nextPage}&pageItems=${pageItems}` : null;
            const previousUrl = previousPage ? `${baseUrl}?page=${previousPage}&pageItems=${pageItems}` : null;

            let results = {
                count: totalCount,
                countByCategory: {
                    'Alimentos': alimentosProducts.length,
                    'Accesorios': accesoriosProducts.length,
                    'Cuidado e Higiene': cuidadoHigieneProducts.length,
                    'Ropa': ropaProducts.length
                },
                products: productsList,
                next: nextUrl,
                previous: previousUrl
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
            let productJSON = await product.toJSON();

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