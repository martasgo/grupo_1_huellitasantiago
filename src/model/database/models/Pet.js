module.exports = (sequelize, DataTypes) => {
    let alias = 'Pet'
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        mascota: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
    let config = {
        tableName: 'pets',
        timestamps: false
    }

    const Pet = sequelize.define(alias, columns, config);

     Pet.associate = function(models){
        Pet.hasMany(models.Product, {
            as: 'product',
            foreignKey: 'id_mascota'
        }) 

    } 
    return Pet;
}