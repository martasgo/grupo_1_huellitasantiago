module.exports = (sequelize, DataTypes) => {
    let alias = 'CartProduct'
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        id_shopping_cart: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_product :{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precio :{
            type: DataTypes.DECIMAL(7,2),
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        descuento: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }
    let config = {
        tableName: 'carts_products',
        timestamps: false
    }

    const CartProduct = sequelize.define(alias, columns, config);

    CartProduct.associate = function(models){
        CartProduct.belongsTo(models.ShoppingCart, {
            as: 'shoppingCart',
            foreignKey: 'id_shopping_cart'
        })   

        CartProduct.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'id_product',
        })

    }
    return CartProduct;
}