const { Router } = require("express");
const {body} = require ("express-validator");

const userController = require("../controllers/userController");
const loginValidations = require ("../middlewares/loginValidations");
const guestMiddleware = require ("../middlewares/guestMiddleware");
const authMiddleware = require ("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const editValidations = require("../middlewares/editValidations");
const registerValidations = require("../middlewares/registerValidations");

const routerUsers = Router();
const path = require ('path');
const multer = require ('multer');

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
routerUsers.delete(routesUser.deleteRoute,authMiddleware, userController.destroyController);

// get-post form registración
routerUsers.get(routesUser.registerRoute, guestMiddleware, userController.registerController);
routerUsers.post(routesUser.registerRoute, upload.single("foto"), registerValidations, userController.addRegisterController);
 
routerUsers.get(routesUser.listUsersRoute, authMiddleware, adminMiddleware, userController.listUsersController);

routerUsers.get(routesUser.salesAdminRoute, authMiddleware, adminMiddleware, userController.salesListController);

//editar y guardar registro de usuario, YA Registrado!-Sole
routerUsers.get(routesUser.editRegister,authMiddleware, userController.editController);
routerUsers.put(routesUser.editRegister, upload.single("foto"), editValidations, userController.updateEditController);

module.exports = routerUsers;