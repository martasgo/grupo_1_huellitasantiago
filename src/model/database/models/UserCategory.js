module.exports = (sequelize, dataTypes) => {
    let alias = "UserCategory";
    let cols = {    
      id: {
        type: dataTypes.INTERGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },    
      mascota: {
        type: dataTypes.STRING,
        allowNull: false,
      },
    };
  
    let config = {
      timestamps: false,    
      tablename: 'users_categories'
    };
    const Usercategory = sequelize.define(alias, cols, config);
  
    Usercategory.associate = function (models) {
      Usercategory.hasMany(models.User, {
        as: "users", 
        foreignKey: "id_categoria",
      });
  
      return Usercategory;
    };
  };