module.exports = (sequelize, DataTypes) => {
    let alias = 'PetSize'
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tamanio: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
    let config = {
        tableName: 'pets_sizes',
        timestamps: false
    }

    const PetSize = sequelize.define(alias, columns, config);

    PetSize.associate = function(models){
        PetSize.hasMany(models.Product, {
            as: 'product',
            foreignKey: 'id_tamanio_mascota'
        }) 

    }
    return PetSize;
}