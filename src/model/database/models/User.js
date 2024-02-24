module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {    
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },    
      nombre: {
        type: dataTypes.STRING,
        allowNull: false,
      },    
      apellido: {
        type: dataTypes.STRING,
        allowNull: false,
      },    
      email: {
        type: dataTypes.STRING,
        allowNull: false,
      },    
      contrasenia: {
        type: dataTypes.STRING,
        allowNull: false,
      },    
      direccion: {
        type: dataTypes.STRING,
        allowNull: false,
      },    
      telefono: {
        type: dataTypes.BIGINT,
        allowNull: false,
      },    
      imagen: {
        type: dataTypes.STRING,
        allowNull: false,
      },    
      id_categoria: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
    };
   
    let config = {
      timestamps: false, 
      tablename: 'users'
    };
    const User = sequelize.define(alias, cols, config);
  
    User.associate = function (models) {
      User.belongsTo(models.UserCategory, {
        as: "usersCategories", 
        foreignKey: "id_categoria",
      });
      User.hasMany(models.ShoppingCart, {
          as: "shoppingCarts", 
          foreignKey: "id_cliente",
      });
    };
  
    return User;
  };