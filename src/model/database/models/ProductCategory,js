module.exports = (sequelize, DataTypes) => {
    let alias = 'ProductCategory'
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
    let config = {
        tableName: 'products_categories',
        timestamps: false
    }

    const ProductCategory = sequelize.define(alias, columns, config);

     ProductCategory.associate = function(models){
        ProductCategory.hasMany(models.Product, {
            as: 'product',
            foreignKey: 'id_categoria'
            
        }),    
        ProductCategory.hasMany(models.PackageSize, {
            as: 'packages_sizes',
            foreignKey: 'id_category'  
         }),
        ProductCategory.hasMany(models.ProductSubCategory, {
            as: 'products_sub_categories',
            foreignKey: 'id_category'
        })
    }          
    return ProductCategory;
}