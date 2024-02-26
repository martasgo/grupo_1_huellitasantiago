module.exports = (sequelize, DataTypes) => {
    let alias = 'Brand';
    let cols = {    
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },       
        nombre_marca: {
            type: DataTypes.STRING,
            allowNull: false
        }
    };
   
    let config = {
        timestamps: false, 
        tablename: 'brands'
    };
    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = function (models) {
        Brand.hasMany(models.Product, {
          as: "products", 
          foreignKey: "id_marca",
        });
};
return Brand;
};