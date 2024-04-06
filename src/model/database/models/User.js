module.exports = (sequelize, DataTypes) => {
    let alias = "User";
    let cols = {    
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },    
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },    
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },    
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },    
      contrasenia: {
        type: DataTypes.STRING,
        allowNull: false,
      },    
      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },    
      telefono: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },    
      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },    
      id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      activo: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
    };
   
    let config = {
      timestamps: false, 
      tableName: 'users'
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