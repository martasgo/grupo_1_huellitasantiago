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
      console.log('body que viene')
      console.log(req.body);
      const resultValidation = validationResult(req);

      if ( resultValidation.errors.length > 0){
        res.render('../views/users/register.ejs', {
          title: 'Registro de usuarios',
          errors: resultValidation.mapped(),
          oldData: req.body
        });
      }
      
      let userInDB = User.getByField("email" , req.body.email );

      if (userInDB) {
        // No quiero hacer el registro porque ya existe, entonces quiero
        // mandar un error
        res.render('../views/users/register.ejs',{
          title: 'Registro de usuarios',
          errors: {
            email: {
              msg: 'Este email ya está registrado'
            }
          },
          oldData: req.body
        });
      };
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
      
    },
    profileController: (req, res) => {
        //const user = req.session.userLogged || {};
        // if (user.categoria === 'cliente') {
        res.render('../views/users/profileAdmin.ejs', {
            title: 'Perfil de Cliente',
           // user: req.session.userLogged
        });
        /* } else {
            res.render('../views/users/profileAdmin.ejs', {
            title: 'Perfil de Administrador',
           // user: req.session.userLogged
        });
        }*/
    },
    logoutController: (req, res) => {
      res.clearCookie("userEmail");
      req.session.destroy();
      return res.redirect ("/");
    },
    listUsersController: (req,res) => {
      const usersList = User.getData();
      res.render('../views/users/usersList.ejs', {
        title: 'Listado de usuarios',
        usersList
    });
    }
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