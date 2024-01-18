const { validationResult } = require ("express-validator");
const User = require ("../models/User");
let bcrypt = require ("bcrypt");

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
      const idUser = parseInt(req.params.idUser);
      const infoUser = User.findByPk(idUser);
      console.log(infoUser);
      res.render("../views/users/editUser.ejs",{title: 'Edición de usuarios', infoUser})

    },
    updateEditController: (req, res)=>{
      const resultValidation = validationResult(req);

      if ( resultValidation.errors.length > 0){
        res.render('../views/users/editUser.ejs', {
          title: 'Edición de usuarios',
          errors: resultValidation.mapped(),
          oldData: req.body
        });
      }
      
      let userInDB = User.getByField("email" , req.body.email );

      if (userInDB) {
        // No se hace la edición del registro porque ya existe. 
          res.render('../views/users/editUser.ejs',{
          title: 'Edición de usuarios',
          errors: {
            email: {
              msg: 'Este email ya está registrado'
            }
          },
          oldData: req.body
        });
      };
      //Cuando el usuario exite, se edita la información y se guarda.
      const {idUser} = req.params;
      const infoUser = User.findByPk(idUser);

      let updateUser = User.findByPk((user)=>user.id === idUser);
      infoUser[updateUser].nombreUsuario = req.body.nombre;
      infoUser[updateUser].apellidoUsuario = req.body.apellido;
      infoUser[updateUser].emailUsuario = req.body.email;
      infoUser[updateUser].direccionUsuario = req.body.direccion;
      infoUser[updateUser].telefonoUsuario = req.body.telefono;
      infoUser[updateUser].imagenUsuario = req.body.imagen;

      fs.writeFileSync(usersFilePathFilePath, JSON.stringify(infoUser));  
      res.redirect("/profile");
    },
    

  };
  
// Probando método de hasheo de contraseñas

// console.log(userController.passwordHash("MabuttiDH24"));

// console.log(userController.passwordHash("SsmithDH24"));

// console.log(userController.passwordHash("MpereyraDH24"));

// console.log(userController.passwordHash("MgomezDH24"));

// console.log(userController.passwordHash("GdominguezDH24"));


// Probando compare sync
// console.log(bcrypt.compareSync("MabuttiDH24" , "$2a$10$Q/N.y/cCTGDASVe7jXlfXuQXL6R/bACboukDdSjHsHyv3./BSxfAy"));
// console.log(bcrypt.compareSync("SsmithDH24" , "$2a$10$BWWIFCWKd7gxA57X1p2gK.efMlI2sfEqtDWYl6i5zbuOoIN2HY2Ei"));
// console.log(bcrypt.compareSync("MpereyraDH24" , "$2a$10$f0kwB45GE8kVdI.W6gIvqOKE.wIxSM.XsIEpdRBIajG3AX/ZWVrvu"));
// console.log(bcrypt.compareSync("MgomezDH24" , "$2a$10$jmeHLz.wcBHKov6WxHPbmORHs9tr5.Q8Dq9pfSCnoGYCY4qHZlyZC"));
// console.log(bcrypt.compareSync("GdominguezDH24" , "$2a$10$UDKihaU/PuTghnDEboD1oOeIpOpJm3cSpu1YZqENJ.1l9bYQEDOve"));

  module.exports = userController;