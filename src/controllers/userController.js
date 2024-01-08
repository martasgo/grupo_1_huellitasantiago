const { validationResult } = require ("express-validator");

const userController = {
    loginController: (req, res) => {
      res.render('../views/users/login.ejs', {
        title: 'Login'
      });
    },
    // Método para validar y procesar el login de usuarios
    loginProcess: (req, res) => {
      let errors = validationResult(req);
      if (! errors.isEmpty()) {
        res.render('../views/users/login.ejs', {title:'Login', errors: errors.array() });
      } else {res.redirect('/user/profile')}
    },
    registerController: (req, res) => {
      res.render('../views/users/register.ejs', {
        title: ''
      });
    },
    profileController: (req, res) => {
        res.render('../views/users/profile.ejs', {
            title: 'Perfil de usuario'
        });
    }
  };
  
  module.exports = userController;