module.exports = (sequelize, DataTypes) => {
    let alias = 'PetAge'
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        edad: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
    let config = {
        tableName: 'pets_ages',
        timestamps: false
    }

    const PetAge = sequelize.define(alias, columns, config);

    PetAge.associate = function(models){
        PetAge.hasMany(models.Product, {
            as: 'product',
            foreignKey: 'id_edad_mascota'
        }) 

    }
    return PetAge;
}