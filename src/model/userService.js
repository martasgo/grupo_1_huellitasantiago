const db = require("./database/models");
const Op = db.Sequelize.Op;
const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");
let bcrypt = require("bcryptjs");

// Objeto User que contiene los métodos para manipular el JSON de usuarios
const userService = {
  getData: async function () {
    try {
      return await db.User.findAll();
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  // Método que obtiene a todos los usuarios
  findAll: async function () {
    try {
      return await this.getData();
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  // Método para encontrar un usuario por ID
  getByPk: async function (id) {
    try {
      const userFound = await db.User.findByPk(id);
      return userFound;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  // Método para encontrar un usuario por campo de formulario
  getByField: async function (email) {
    try {
      return await db.User.findOne({
        where: {
          email: email,
        },
      });
      
    } catch (error) {
      return{errors: "Error al buscar el usuario"};
    }
  },

  delete: async (id) => {
    try {
      const userToUpdate = await db.User.findByPk(id);
      if (!userToUpdate) {
        throw new Error("Usuario no encontrado");
      }
      userToUpdate.activo = false; 
      await userToUpdate.save(); 
      return userToUpdate;
    } catch (error) {
      throw new Error("No se pudo procesar la solicitud correctamente");
    }
  },

  deleteImagen: async (img) => {
    try {
      let directorio = path.resolve(__dirname, "../../public/images/usuarios");
      const rutaImagen = path.join(directorio, img);
      fs.unlinkSync(rutaImagen);
    } catch (error) {
      throw new Error("No se pudo procesar la solicitud correctamente");
    }
  },

  updateList: async (user, id) => {
    try {
      return await db.User.update(user, {
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error("No se pudo procesar la solicitud correctamente");
    }
  },

  addUser: async function (newUser, userInDB) {
    try {
      if(userInDB && userInDB.activo == false){
        return await db.User.update(newUser, {
          where: {
            id: userInDB.id,
          },
        });
      }
      return await db.User.create(newUser);
    } catch (error) {
      throw new Error("No se pudo procesar la solicitud correctamente");
    }
  },

  login: async function (userData) {
    try {
    const errors = validationResult(userData);
    if (!errors.isEmpty()) {
      const mappedErrors = errors.mapped();
      return { errors: mappedErrors };
    }    
    const userToLogin = await userService.getByField(userData.email);
    
    if (!userToLogin || userToLogin.activo == false) {
      console.log(errors)
      return { errors: { email: { msg: "Este email no se encuentra registrado" } } };
    
    }
    const isOkThePassword = bcrypt.compareSync(
      userData.contraseña,
      userToLogin.contrasenia
    );
    if (!isOkThePassword) {
      return { errors: { contrasenia: { msg: "Credenciales inválidas" } } };
    }        
    return {user: userToLogin};  
  } catch (error) {
    return { errors: { general: { msg: "Error en el servidor al iniciar sesión" } } };
  }
}
}

module.exports = userService;