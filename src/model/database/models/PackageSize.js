module.exports = (sequelize, DataTypes) => {
    let alias = 'PackageSize'
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unidad_medida: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_category:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
    let config = {
        tableName: 'packages_sizes',
        timestamps: false
    }

    const PackageSize = sequelize.define(alias, columns, config);

    PackageSize.associate = function(models){
        PackageSize.belongsTo(models.ProductCategory, {
            as: 'product_category',
            foreignKey: 'id_category'
        }),
        PackageSize.hasMany(models.Product, {
            as: 'product',
            foreignKey: 'id_presentacion' 

    })}
    return PackageSize;
}