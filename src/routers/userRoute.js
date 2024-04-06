const { Router } = require("express");
const routerUsers = Router();

const userController = require("../controllers/userController");
const loginValidations = require ("../middlewares/loginValidations");
const guestMiddleware = require ("../middlewares/guestMiddleware");
const authMiddleware = require ("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const multerMiddleware = require('../middlewares/multerMiddleware');
const editValidations = require("../middlewares/editValidations");
const registerValidations = require("../middlewares/registerValidations");
const forgotPassValidation = require("../middlewares/forgotPassValidation");

const routesUser = {
    users: '/',
	user: '/:id',
    registration: "/registration",
	login: "/login",
	forgotPass: "/forgotPassword",
	edition: "/:id/edition",
    profile: "/:id/profile",
	purchases: "/:id/purchases",
	list: "/list",
	sales: "/sales",
    logout: "/logout",
    deletion: "/:id/deletion",
	informacionLegalRoute:"/informacionLegal",
	notificacionesRoute:"/notificaciones"	
};

routerUsers.get(routesUser.registration, guestMiddleware, userController.registerController);
routerUsers.post(routesUser.users, multerMiddleware.userUpload.single("foto"), registerValidations, userController.addRegisterController);

routerUsers.get(routesUser.login, guestMiddleware , userController.loginController);
routerUsers.post(routesUser.login, loginValidations , userController.loginProcess);

routerUsers.get(routesUser.forgotPass, userController.forgotPassController);
routerUsers.post(routesUser.forgotPass, forgotPassValidation, userController.forgotPassProcess);

routerUsers.get(routesUser.edition, authMiddleware, userController.editController);
routerUsers.put(routesUser.user, multerMiddleware.userUpload.single("foto"), editValidations, userController.updateEditController);

routerUsers.get(routesUser.profile, authMiddleware , userController.profileController);

routerUsers.get(routesUser.logout, userController.logoutController);

routerUsers.get(routesUser.purchases, authMiddleware, userController.purchasesController);

routerUsers.get(routesUser.deletion, authMiddleware, userController.deleteController);
routerUsers.delete(routesUser.user, authMiddleware, userController.destroyController);
 
routerUsers.get(routesUser.list, authMiddleware, adminMiddleware, userController.listUsersController);

routerUsers.get(routesUser.sales, authMiddleware, adminMiddleware, userController.salesListController);

routerUsers.get(routesUser.informacionLegalRoute, authMiddleware ,userController.informacionLegalController);
routerUsers.get(routesUser.notificacionesRoute, authMiddleware ,userController.notificacionesController);

module.exports = routerUsers;