module.exports = (sequelize, DataTypes) => {

    let alias = 'Product';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        precio: {
            type: DataTypes.DECIMAL(7,2),
            allowNull: false
        },
        descuento: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_mascota: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_marca: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_edad_mascota: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_tamanio_mascota: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        destacado: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_categoria: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_sub_categoria: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_presentacion: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        activo:{
            type: DataTypes.TINYINT,
            allowNull: false
        }
    };
    
    let config = {
        timestamps: false,
        tableName: 'products'
    };
    
    const Product = sequelize.define(alias, cols, config);
    
    Product.associate = function (models) {

        // Asociación con la tabla pets
        Product.belongsTo(models.Pet , {
            as: 'pets',
            foreignKey: 'id_mascota'
        }),

        //Asociación con la tabla pets_sizes
        Product.belongsTo(models.PetSize , {
            as: 'pets_sizes',
            foreignKey: 'id_tamanio_mascota'
        }),

        // Asociación con la tabla pets_ages
        Product.belongsTo(models.PetAge , {
            as: 'pets_ages',
            foreignKey: 'id_edad_mascota'
        }),

        // Asociacion con la tabla products_categories
        Product.belongsTo(models.ProductCategory , {
            as: 'categories',
            foreignKey: 'id_categoria'
        }),

        // Asociacion con la tabla products_sub_categories
        Product.belongsTo(models.ProductSubCategory , {
            as: 'sub_categories',
            foreignKey: 'id_sub_categoria'
        }),

        // Asociacion con la tabla packages_sizes
        Product.belongsTo(models.PackageSize , {
            as: 'packages_sizes',
            foreignKey: 'id_presentacion'
        }),

        // Asociacion con la tabla brands
        Product.belongsTo(models.Brand , {
            as: 'brands',
            foreignKey: 'id_marca'
        }),
        
        // Asociación con la tabla shopping_carts
        Product.belongsToMany(models.ShoppingCart , {
            as: 'shopping_carts',
            through: 'carts_products',
            foreignKey: 'id_product',
            otherKey: 'id_shopping_cart',
            timestamps: false
        })

    };

    return Product
};