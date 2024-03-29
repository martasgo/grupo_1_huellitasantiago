const fs = require("fs");
const path = require("path");
const db = require("./database/models");

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

  getAllApiUsers: async function (page = 1, pageUsers = 2) {
    try {
      const offset = (page - 1) * pageUsers;
      let allUsers = await db.User.findAll({
        limit: pageUsers,
        offset: offset
      });
      const totalCount = await db.User.count();
      let apiUsers = [];
      allUsers.forEach(user => {
        let eachUser = {
          id: user.id,
          name: user.nombre,
          apellido: user.apellido,
          email: user.email,
          detail: `localhost:3000/api/users/${user.id}`
        }
        apiUsers.push(eachUser)
      });
      // Calcular valores para next y previous
      const totalPages = Math.ceil(totalCount / pageUsers);
      const nextPage = page < totalPages ? page + 1 : null;
      const previousPage = page > 1 ? page - 1 : null;

      // Construir las URLs de next y previous
      const baseUrl = 'localhost:3000/api/users';
      const nextUrl = nextPage ? `${baseUrl}?page=${nextPage}&pageUsers=${pageUsers}` : null;
      const previousUrl = previousPage ? `${baseUrl}?page=${previousPage}&pageUsers=${pageUsers}` : null;

      let response = {
        count: totalCount,
        users: apiUsers,
        next: nextUrl,
        previous: previousUrl
      }
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  }, 

  getApiUserByPk: async function (id, res) {
    try {
      const userFound = await db.User.findByPk(id);
      let apiUser = {
        id: userFound.id,
        nombre: userFound.nombre,
        apellido: userFound.apellido,
        email: userFound.email,
        direccion: userFound.direccion,
        telefono: userFound.telefono,
        imagen: userFound.imagen,
        categoria: userFound.id_categoria
      }
      return apiUser;
    } catch (error) {
      console.log('el error es', error);
      return [];
    }
  },
};


module.exports = userService;
