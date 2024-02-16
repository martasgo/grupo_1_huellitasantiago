module.exports = (sequelize, dataTypes) => {
    let alias = 'Brand';
    let cols = {    
        id: {
            type: dataTypes.INTERGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },       
        nombre_marca: {
            type: dataTypes.STRING,
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