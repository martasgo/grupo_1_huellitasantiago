const userController = {
    loginController: (req, res) => {
      res.render('../views/users/login.ejs', {
        title: 'Login'
      });
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