const userController = {
    loginController: (req, res) => {
      res.render('../views/users/login.ejs', {
        title: ''
      });
    },
    registerController: (req, res) => {
      res.render('../views/users/register.ejs', {
        title: ''
      });
    },
    profileController: (req, res) => {
        res.render('../views/users/menu-usuario.ejs', {
            title: ''
        });
    }
  };
  
  module.exports = userController;