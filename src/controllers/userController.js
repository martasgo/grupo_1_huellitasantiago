const { validationResult } = require ("express-validator");
const User = require ("../models/User");
let bcrypt = require ("bcryptjs");

const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

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
            if (isOkThePassword) { //debajo de esta línea falta el delete userToLogin.password;
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
        title: ''
      });
    },
    profileController: (req, res) => {
        const user = req.session.userLogged || {};
        res.render('../views/users/profile.ejs', {
            title: 'Perfil de usuario',
            user: req.session.userLogged
        });
    },
    logoutController: (req, res) => {
      res.clearCookie("userEmail");
      req.session.destroy();
      return res.redirect ("/");
    },
// Controlladores de edición de registro de usuario GET y PUT
    editController: (req, res)=>{
      //res.send('llega la info');
     // const user = req.session.userLogged || {};
      const idUser = parseInt(req.params.idUser);
      const infoUser = User.getByPk(idUser);
      console.log(infoUser);
      res.render("../views/users/editUser.ejs",{
        title: 'Edición de usuarios',
       // user,
        infoUser
      })
    },
    updateEditController: (req, res)=>{
      const resultValidation = validationResult(req);
      //console.log(resultValidation);
      //console.log(req.body);
      //console.log(req.file);
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