module.exports = (sequelize, dataTypes) => {
    let alias = "UserCategory";
    let cols = {    
      id: {
        type: dataTypes.INTEGER,
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
    const UserCategory = sequelize.define(alias, cols, config);
  
    UserCategory.associate = function (models) {
      UserCategory.hasMany(models.User, {
        as: "users", 
        foreignKey: "id_categoria",
      });
    };
    return UserCategory;
  };