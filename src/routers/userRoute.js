const { Router } = require("express");
const userController = require("../controllers/userController");
const {body} = require ("express-validator");
const loginValidations = require ("../middlewares/loginValidations");
const guestMiddleware = require ("../middlewares/guestMiddleware");
const authMiddleware = require ("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const registerValidations = require("../middlewares/registerValidations");

const path = require("path");
const multer = require("multer");
const routerUsers = Router();

// Multer - manejo del almacenamiento
const storage = multer.diskStorage({
	destination: (req , file , cb) => {
		cb (null , path.resolve(__dirname , "../../public/images/usuarios"));
	},
	filename: (req , file , cb) => {
		cb (null , file.fieldname + "-" + Date.now() + path.extname(file.originalname))
	}
});

// Instanciar multer para manejar los métodos
const upload = multer ({ storage });

const routesUser = {
    loginRoute: "/login",
    registerRoute: "/register",
    profileRoute: "/profile",
	listUsersRoute: "/usersList",
    logoutRoute: "/logout",
    deleteRoute: "/delete/:id"
};

routerUsers.get(routesUser.loginRoute, guestMiddleware , userController.loginController);
routerUsers.get(routesUser.registerRoute, guestMiddleware , userController.registerController);
routerUsers.get(routesUser.profileRoute, authMiddleware , userController.profileController);
routerUsers.post(routesUser.loginRoute , loginValidations , userController.loginProcess);
routerUsers.get(routesUser.logoutRoute, userController.logoutController);
routerUsers.get(routesUser.deleteRoute, userController.deleteController);
routerUsers.delete(routesUser.deleteRoute, userController.destroyController);

// get-post form registración
routerUsers.get(routesUser.registerRoute, userController.registerController);
routerUsers.post(routesUser.registerRoute, registerValidations, upload.single("foto"), userController.addRegisterController);

routerUsers.get(routesUser.listUsersRoute, adminMiddleware, userController.listUsersController);

module.exports = routerUsers;