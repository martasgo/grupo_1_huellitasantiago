module.exports = (sequelize, DataTypes) => {
    let alias = 'ProductSubCategory'
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_sub_category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_category: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
    let config = {
        tableName: 'products_sub_categories',
        timestamps: false
    }

    const ProductSubCategory = sequelize.define(alias, columns, config);

     ProductSubCategory.associate = function(models){
        ProductSubCategory.belongsTo(models.ProductCategory, {
            as: 'product_category',
            foreignKey: 'id_category'
        }),
        ProductSubCategory.hasMany(models.Product, {
            as: 'product',
            foreignKey: 'id_sub_categoria' 

    })}
    return ProductSubCategory;
}