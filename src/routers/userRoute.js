const { Router } = require("express");
const {body} = require ("express-validator");
const routerUsers = Router();

const userController = require("../controllers/userController");
const loginValidations = require ("../middlewares/loginValidations");
const guestMiddleware = require ("../middlewares/guestMiddleware");
const authMiddleware = require ("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const multerMiddleware = require('../middlewares/multerMiddleware');
const editValidations = require("../middlewares/editValidations");
const registerValidations = require("../middlewares/registerValidations");

const routesUser = {
    loginRoute: "/login",
    registerRoute: "/register",
	editRegister: "/editUser/:idUser",
    profileRoute: "/profile",
	comprasRoute: "/compras/:id",
	listUsersRoute: "/usersList",
	salesAdminRoute: "/salesList",
    logoutRoute: "/logout",
    deleteRoute: "/delete/:id"
};

routerUsers.get(routesUser.loginRoute, guestMiddleware , userController.loginController);
routerUsers.post(routesUser.loginRoute , loginValidations , userController.loginProcess);

routerUsers.get(routesUser.profileRoute, authMiddleware , userController.profileController);

routerUsers.get(routesUser.logoutRoute, userController.logoutController);

routerUsers.get(routesUser.comprasRoute, authMiddleware, userController.compras);

routerUsers.get(routesUser.deleteRoute,authMiddleware, userController.deleteController);
routerUsers.delete(routesUser.deleteRoute, authMiddleware, userController.destroyController);

// get-post form registración
routerUsers.get(routesUser.registerRoute, guestMiddleware, userController.registerController);
routerUsers.post(routesUser.registerRoute, multerMiddleware.userUpload.single("foto"), registerValidations, userController.addRegisterController);
 
routerUsers.get(routesUser.listUsersRoute, authMiddleware, adminMiddleware, userController.listUsersController);

routerUsers.get(routesUser.salesAdminRoute, authMiddleware, adminMiddleware, userController.salesListController);

//editar y guardar registro de usuario, YA Registrado!-Sole
routerUsers.get(routesUser.editRegister, authMiddleware, userController.editController);
routerUsers.put(routesUser.editRegister, authMiddleware, multerMiddleware.userUpload.single("foto"), editValidations, userController.updateEditController);

module.exports = routerUsers;