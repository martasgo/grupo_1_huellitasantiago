const fs = require("fs");
const path = require("path");
const db = require("./database/models");
//const Users = db.User;

// Objeto User que contiene los métodos para manipular el JSON de usuarios
const userService = {
  // Ruta hacia el JSON de usuarios
  //fileName: path.join(__dirname , "../data/users.json"),
  // Conversión del JSON de usuarios a array para poder trabajarlo con JS

  /* getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName , "utf-8"));
    }, */
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
  getByField: async function (text) {
    try {
      const userFound = await db.User.findOne({
        where: {
          email: text,
        },
      });
      return userFound;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  // Método para eliminar un usuario por su ID
  /* delete: function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter (oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName , JSON.stringify(finalUsers , null , " ") );
	    return true;
    }, */

  delete: async (id) => {
    try {
      const result = await db.User.destroy({
        where: {
          id: id,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo procesar la solicitud correctamente");
    }
  },

  /* deleteImagen: async (imagen) => {
    try {
      const result = await db.User.destroy({
        where: {
          imagen: imagen,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo procesar la solicitud correctamente");
    }
  }, */

  deleteImagen:  async (img) => {
    try {    
    let directorio = path.resolve(__dirname, "../../public/images/usuarios");
    const rutaImagen = path.join(directorio, img);
    fs.unlinkSync(rutaImagen);
  }catch (error){
    console.log(error);
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
      console.log(error);
      throw new Error("No se pudo procesar la solicitud correctamente");
    }
  },

  addUser: async function (user) {
    try {
      return await db.User.create(user);
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo procesar la solicitud correctamente");
    }
  },
};
/* updateList: function(user){
        fs.writeFileSync(this.fileName, JSON.stringify(user), {
            flag:"w",
            encoding:"utf-8",
        });
	    return true;
    }, */

/*    updateList: function (req, res) {
        userService.getByPk(req.params.id, req.body)
          .then(() => res.redirect(`/userList/${req.params.id}/detalle`))
          .catch((e) => res.send(error.message));
    }, */

/* deleteImagen: function(img){
        let directorio = path.resolve(__dirname , "../../public/images/usuarios");
        const rutaImagen = path.join(directorio, img);
        fs.unlinkSync(rutaImagen);
    } */

module.exports = userService;
