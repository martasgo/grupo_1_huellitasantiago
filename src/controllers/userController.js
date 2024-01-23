const { validationResult } = require ("express-validator");
const User = require ("../models/User");
let bcrypt = require ("bcryptjs");

const userController = {
    loginController: (req, res) => {
      res.render('../views/users/login.ejs', {
        title: 'Login'
      });
    },

    // Método para encriptar una contraseña
    // Lo usamos para encriptar las contraseñas que en el JSON aún figuren como string
    passwordHash: function(texto) {
        let hasheadas = bcrypt.hashSync(texto , 10);
        return hasheadas;
    },

    // Método para validar y procesar el login de usuarios
    loginProcess: (req, res) => {
      let errors = validationResult(req);  
      if (! errors.isEmpty()) {
        res.render('../views/users/login.ejs', 
          { title:'Login',  
            errors: errors.array() 
          });
      } else {
          let userToLogin = User.getByField("email" , req.body.email );
          if (userToLogin) {
            let isOkThePassword = bcrypt.compareSync(req.body.contraseña , 
              userToLogin.contraseña);
            if (isOkThePassword) {
              req.session.userLogged = userToLogin;
              if (req.body.recordarme) {
                res.cookie("userEmail" , req.body.email, {maxAge: 60000 * 2})
              };
              return res.redirect("/user/profile");
            };
            return res.render ('../views/users/login.ejs' , {
              title: "Login",
              errors: {
                contraseña: {
                  msg:"Credenciales inválidas"
                }
              }
            });
          };
          return res.render ('../views/users/login.ejs' , {
            title:'Login',
            errors: {
              email: {
                msg:"Este email no se encuentra registrado"
              }
            }
          });
       };
        
    },
    registerController: (req, res) => {
      res.render('../views/users/register.ejs', {
        title: 'Registro de usuarios'
      });
    },
     //Controlador Ruta para almacenar el nuevo usuario
    addRegisterController:(req, res) => {
      let resultValidation = validationResult(req);

      if ( resultValidation.errors.length > 0){
        // como existen errores
        // elimino la imagen que se guardó hasta tener todas las validaciones ok
        User.deleteImagen(req.file.filename);
        res.render('../views/users/register.ejs', {
          title: 'Registro de usuarios',
          errors: resultValidation.mapped(),
          oldData: req.body
        }); 
      } else {
        // verifico el mail no esté registrado anteriormente
        let userInDB = User.getByField("email" , req.body.email );

        if (userInDB) {
          // elimino la imagen que se guardó hasta tener todas las validaciones ok
          User.deleteImagen(req.file.filename);
          // manda msj de error a la vista
          res.render('../views/users/register.ejs',{
            title: 'Registro de usuarios',
            errors: {
              email: {
                msg: 'Este email ya está registrado'
              }
            },
            oldData: req.body
          });
         
        } else {
          //si todas las validaciones dan OK agrego el user
          // Creo el array de usuarios usando la función getUsers
          const usersList = User.getData();

          // Defino la variable que recibe la imagen del formulario
          const image = req.file ? req.file.filename : "default-image.png";

          // Defino la variable que guarda el usuario creado desde el formulario
          const newUser = {
            id: usersList[usersList.length-1].id + 1,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            direccion: req.body.dir,
            telefono: req.body.telefono,
            contraseña: bcrypt.hashSync(req.body.contrasenia , 10 ),
            categoria: 'cliente',
            imagen: image
          };

          // Agrego el usuario creado al array de usuarios
          usersList.push(newUser);

          // Actualizo el JSON de usuarios luego de crear el user
          User.updateList(usersList);
            
          return res.render ('../views/users/login.ejs' , {
            title:'Login',
          });
        }
      }
    },
    profileController: (req, res) => {
        const user = req.session.userLogged || {};
        if (user.categoria === 'cliente') {
          res.render('../views/users/profile.ejs', {
              title: 'Perfil de Cliente',
              user: req.session.userLogged
          });
        } else {
            res.render('../views/users/profileAdmin.ejs', {
            title: 'Perfil de Administrador',
            user: req.session.userLogged
        });
        }
    },
    logoutController: (req, res) => {
      res.clearCookie("userEmail");
      req.session.destroy();
      return res.redirect ("/");
    },
    deleteController: (req, res) => {
      const user = req.session.userLogged || {};
      userId = parseInt(req.params.id);
      const userToDelete = User.getByPk(userId);

      res.render('../views/users/delete.ejs',{
        title: 'Borrar usuario',
        user,
        userToDelete
      })
    },
    destroyController: (req, res) => {
      const user = req.session.userLogged || {};
      if (user.categoria === "cliente"){
        User.delete(user.id);
        res.clearCookie("userEmail");
        req.session.destroy();
        res.redirect("/");
      } else {
        idToDelete = parseInt(req.params.id);
        User.delete(idToDelete);
        res.redirect("/user/profile");
      }
    },
    listUsersController: (req,res) => {
      const usersList = User.getData();
      res.render('../views/users/usersList.ejs', {
        title: 'Listado de usuarios',
        usersList
      });
    },
    // Controlladores de edición de registro de usuario GET y PUT
    editController: (req, res)=>{
      //res.send('llega la info');
      const user = req.session.userLogged || {};
      const idUser = parseInt(req.params.idUser);
      const infoUser = User.getByPk(idUser);
      console.log(infoUser);
      res.render("../views/users/editUser.ejs",{
        title: 'Edición de usuarios',
        user,
        infoUser
      })
    },
    updateEditController: (req, res)=>{
      const resultValidation = validationResult(req);
      //console.log(resultValidation);
      //console.log(req.body);
      //console.log(req.file);
      const user = req.session.userLogged || {};
      let idUser = parseInt(req.params.idUser);
      let infoUser = User.getByPk(idUser);
      let imagen = req.body.imageAnt;
      if ( resultValidation.errors.length > 0){
        // si hay nueva imagen la borro hasta tener todo ok
        if (req.file) {
          User.deleteImagen(req.file.filename);
        }
        res.render('../views/users/editUser.ejs', {
          title: 'Edición de usuarios',
          errors: resultValidation.mapped(),
          oldData: req.body,
          infoUser,
          user,
          imagen
        });
      } else {
          // se verifica el mail no esté registrado
          let userInDB = User.getByField("email" , req.body.email);
          //console.log(userInDB);
          //console.log(infoUser);
          if (userInDB.id !== infoUser.id) {
            //si existe el mail significa que no se puede guardar al edicion y borro la imagen que se ha subido
            if (req.file) {
              User.deleteImagen(req.file.filename);
            }
            // No se hace la edición del registro porque ya existe ese mail. 
              res.render('../views/users/editUser.ejs',{
              title: 'Edición de usuarios',
              errors: {
                email: {
                  msg: 'Este email ya está registrado'
                }
              },
              oldData: req.body,
              infoUser,
              user,
              imagen
            });
          } else {
            //Cuando el usuario exite, se edita la información y se guarda.
            let idUser = parseInt(req.params.idUser);
            const infoUser = User.getByPk(idUser);

            //obtengo todo el listado de usuarios
            let allUser = User.getData();
            //busco el indice al que corresponde el usuario que estoy editando
            const updateUser = allUser.findIndex((user)=> user.id ==idUser);
            allUser[updateUser].nombre = req.body.nombre;
            allUser[updateUser].apellido = req.body.apellido;
            allUser[updateUser].email = req.body.email;
            allUser[updateUser].direccion = req.body.dir;
            allUser[updateUser].telefono = req.body.telefono;
            allUser[updateUser].categoria = req.body.categoria;
            allUser[updateUser].contraseña = bcrypt.hashSync(req.body.contrasenia , 10 ),
            allUser[updateUser].imagen = req.file ? req.file.filename : infoUser.imagen;

            User.updateList(allUser);
            res.redirect("/user/profile");
          }
      }
    }
  };

  module.exports = userController;