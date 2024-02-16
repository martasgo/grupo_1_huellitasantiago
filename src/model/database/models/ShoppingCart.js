
module.exports = (sequelize, DataTypes) => {
    let alias = 'ShoppingCart'
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidad_productos: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        monto_total: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }
    let config = {
        tableName: 'shopping_carts',
        timestamps: false
    }

    const ShoppingCart = sequelize.define(alias, columns, config);

    ShoppingCart.associate = function(models){
        ShoppingCart.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'id'
        })   

        ShoppingCart.hasMany(models.CartProduct, {
            as: 'cartProduct',
            foreignKey: 'id_shopping_cart',
        })

    }
    return ShoppingCart;
}