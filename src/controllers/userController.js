// DB
const db = require("../model/database/models");
const Op = db.Sequelize.Op;

const { validationResult } = require("express-validator");
let bcrypt = require("bcryptjs");

//Services
const userService = require("../model/userService");
const shoppingCartService = require("../model/shoppingCartService");
const cartProductService = require("../model/cartProductService");

const userController = {
  loginController: (req, res) => {
    try {
      res.render("../views/users/login.ejs", {
        title: "Login",
      });
    } catch (error) {
      res.status(500).send("Error en el servidor");
    }
  },

  // Método para procesar el login de usuarios
  loginProcess: async (req, res) => {
    try {      
      const resultLogin = await userService.login(req.body);
      
    if (resultLogin.errors) {         
          res.render("../views/users/login.ejs", {
          title: "Login",
          errors: resultLogin.errors,
          old: req.body
        });
      } else { 
        req.session.userLogged = resultLogin.user;
        res.redirect(`${userToLogin.id}/profile`);
      }       
    } catch (error) {      
      console.error("Error en el proceso de inicio de sesión:", error);
      res.render("../views/users/login.ejs", {
        title: "Login",
        errors: { general: { msg: "Error al iniciar sesión" } },
        old: req.body
      });
    }
  },    

  registerController: async (req, res) => {
    try {
      res.render("../views/users/register.ejs", {
        title: "Registro de usuarios",
      });
    } catch (error) {      
      res.status(500).send("Error inesperado del servido, intente más tarde");
    }
  },

  listUsersController: async (req, res) => {
    try {
      const usersList = await userService.getData();
      const user = req.session.userLogged || {};
      if (user && user.id_categoria == 1) {
        res.render("../views/users/usersList.ejs", {
          title: "Listado de usuarios",
          usersList,
          user,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error en el servidor");
    }
  },

  //Controlador ruta listar ventas para admin
  salesListController: async (req, res) => {
    try {
      const user = req.session.userLogged || {};
      const ventas = await shoppingCartService.getAll();
      console.log(ventas);
      const orderedProducts = [];

      for (const venta of ventas) {
        const productosEnVenta = await cartProductService.getByCartId(venta.id);
        productosEnVenta.forEach((products) => {
          orderedProducts.push(products);
        });
      }
      res.render("../views/users/ventas.ejs", {
        title: "Listado de ventas",
        user,
        ventas,
        orderedProducts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error en el servidor");
    }
  },

  //Controlador Ruta para almacenar el nuevo usuario
  addRegisterController: async (req, res) => {
    try {
      let resultValidation = validationResult(req);
      if (resultValidation.errors.length > 0) {
        if (req.file) {
          await userService.deleteImagen(req.file.filename);
        }
        res.render("../views/users/register.ejs", {
          title: "Registro de usuarios",
          errors: resultValidation.mapped(),
          oldData: {
            ...req.body,
            imagen: req.file ? req.file.filename : "usuario-default.jpg",
          },
        });
      } else {
        let userInDB = await userService.getByField(req.body.email);
        if (userInDB && userInDB.activo == true) {
          res.render("../views/users/register.ejs", {
            title: "Registro de usuarios",
            errors: {
              email: {
                msg: "Este email ya está registrado",
              },
            },
            oldData: req.body,
          });
        } else {
          // Crear el usuario solo si no existe en la base de datos
          const newUser = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            direccion: req.body.dir,
            telefono: req.body.telefono,
            contrasenia: bcrypt.hashSync(req.body.contrasenia, 10),
            id_categoria: 2,            
            imagen: req.file ? req.file.filename : "usuario-default.jpg",
            activo: true,
          };
          
          await userService.addUser(newUser, userInDB);
          res.render("../views/users/login.ejs", {
            title: "Login",
          });
        }
      }
    } catch (error) {
      console.log(error.message);
      res.send("No se pudo registrar el usuario").status(500);
    }
  },

  profileController: async (req, res) => {
    try {
      const user = req.session.userLogged || {};     
      if (user && user.id_categoria == 2) {
        res.render("../views/users/profile.ejs", {
          title: "Perfil de cliente",
          user,
        });
      } else {
        res.render("../views/users/profileAdmin.ejs", {
          title: "Perfil de Administrador",
          user,
        });
      }
    } catch (error) {
      console.log(error.message);
      res.send("Error inesperado").status(500);
    }
  },

  compras: async (req, res) => {
    try {
      let user = req.session.userLogged || {};
      let comprasUser = await shoppingCartService.getByUser(user.id);
      let orderedProducts = [];

      for (const compra of comprasUser) {
        let productosEnCompra = await cartProductService.getByCartId(compra.id);
        productosEnCompra.forEach((products) => {
          orderedProducts.push(products);
        });
      }
      res.render("../views/users/comprasUser.ejs", {
        title: "Mis Compras",
        user,
        comprasUser,
        orderedProducts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error en el servidor");
    }
  },

  informacionLegalController : async (req,res) => {
    try {
      let user = req.session.userLogged || {};
      res.render("../views/users/informacionlegal.ejs", {
        user:user,
        title: "Informacion Legal",
      });
    } catch (error) {
      console.log(error.message);
      res.send("Error inesperado").status(500);
    }
  },
  notificacionesController : async (req,res) => {
    try {
      let user = req.session.userLogged || {};
      res.render("../views/users/notificaciones.ejs", {
        user:user,
        title: "notificaciones",
      });
    } catch (error) {
      console.log(error.message);
      res.send("Error inesperado").status(500);
    }
  },

  logoutController: async (req, res) => {
    try {
      res.clearCookie("userEmail");
      req.session.destroy();
      return res.redirect("/");
    } catch (error) {
      console.log(error.message);
      res.send("Error inesperado").status(500);
    }
  },

  // Controlladores de edición de registro de usuario GET y PUT
  editController: async (req, res) => {
    try {
      const user = req.session.userLogged || {};
      const idUser = parseInt(req.params.id);
      const infoUser = await userService.getByPk(idUser);
      res.render("../views/users/editUser.ejs", {
        title: "Edición de usuarios",
        user,
        infoUser,
      });
    } catch (error) {
      console.log(error.message);
      res.send("Error inesperado").status(500);
    }
  },

  //Edición de usuario y actualizacion de los datos
  updateEditController: async (req, res) => {
    try {
      const resultValidation = validationResult(req);
      const user = req.session.userLogged || {};
      const idUser = parseInt(req.params.id);
      const infoUser = await userService.getByPk(idUser);
      const imagen = req.body.imageAnt;
      if (resultValidation.errors.length > 0) {
        // si hay nueva imagen la borro hasta tener todo ok
        if (req.file) {
          await userService.deleteImagen(req.file.filename);
        }
        res.render("../views/users/editUser.ejs", {
          title: "Edición de usuarios",
          errors: resultValidation.mapped(),
          oldData: req.body,
          infoUser,
          user,
          imagen,
        });
      } else {
        // En caso de cambiar el correo: se verifica que el mail no esté registrado
        const userInDB = await userService.getByField(req.body.email);
        if (userInDB) {
          if (userInDB.id !== infoUser.id) {
            //si existe el mail significa que no se puede guardar al edición y borro la imagen que se ha subido
            if (req.file) {
              await userService.deleteImagen(req.file.filename);
            }
            // No se hace la edición del registro porque ya existe ese mail que esta editando.
            res.render("../views/users/editUser.ejs", {
              title: "Edición de usuarios",
              errors: {
                email: {
                  msg: "Este email ya está registrado",
                },
              },
              oldData: req.body,
              infoUser,
              user,
              imagen,
            });
          } else {                    
            const editUser = {   
              nombre: req.body.nombre,
              apellido: req.body.apellido,
              email: req.body.email,
              direccion: req.body.dir,
              telefono: req.body.telefono,
              contrasenia: req.body.contrasenia
                ? bcrypt.hashSync(req.body.contrasenia, 10)
                : infoUser.contrasenia,
              imagen: req.file ? req.file.filename : infoUser.imagen,
              id_categoria: req.body.categoria,
              activo: req.body.activo
            };
            

            const newU = await userService.updateList(editUser, idUser);
            // Actualiza la variable de sesión con los nuevos datos del usuario
            if (req.session.userLogged.id == infoUser.id) {
              req.session.userLogged = {
                ...req.session.userLogged, // Mantiene los datos antiguos
                ...editUser, // Agrega los nuevos datos
              };
              // Guarda la variable de sesión actualizada
              req.session.save();
            }
            return res.redirect(`/users/${infoUser.id}/profile`);
          }
        } else {
          //Cuando el usuario exite, se edita la información y se guarda.
          const editUser = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            direccion: req.body.dir,
            telefono: req.body.telefono,
            contrasenia: req.body.contrasenia
              ? bcrypt.hashSync(req.body.contrasenia, 10)
              : infoUser.contrasenia,
            imagen: req.file ? req.file.filename : infoUser.imagen,
            id_categoria: req.body.categoria,
            activo: req.body.activo
          };
          const newU = await userService.updateList(editUser, idUser);
          // Actualiza la variable de sesión con los nuevos datos del usuario
          if (req.session.userLogged.id == infoUser.id) {
            req.session.userLogged = {
              ...req.session.userLogged, // Mantiene los datos antiguos
              ...editUser, // Agrega los nuevos datos
            };
            // Guarda la variable de sesión actualizada
            req.session.save();
          }               
          return res.redirect(`/users/${infoUser.id}/profile`);
        }
      }    
    } catch (error) {
      res.send(error);
    }
  },

  deleteController: async function (req, res) {
    try {
      const user = req.session.userLogged || {};
      const idToDelete = parseInt(req.params.id);
      const userToDelete = await userService.getByPk(idToDelete);
      res.render("../views/users/delete.ejs", {
        title: "Borrar usuario",
        user,
        userToDelete,
      });
    } catch (error) {
      console.log(error.message);
      res.send("Error inesperado").status(500);
    }
  },

  destroyController: async (req, res) => {
    try {
      const user = req.session.userLogged || {};
      const idToDelete = parseInt(req.params.id);
      if (user && user.id_categoria == 2 && user.id === idToDelete) {
        await userService.delete(user.id);
        res.clearCookie("userEmail");
        req.session.destroy();
        res.redirect("/");
      } else if (user && user.id_categoria == 1) {
        await userService.delete(idToDelete);
        res.redirect(`/users/${user.id}/profile`);
      }
    } catch (error) {
      console.log(error.message);
      res.send("Error inesperado").status(500);
    }
  },
};

module.exports = userController;