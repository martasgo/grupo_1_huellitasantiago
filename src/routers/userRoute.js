const { Router } = require("express");
const userController = require("../controllers/userController");
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
	listUsersRoute: "/usersList"
};

routerUsers.get(routesUser.loginRoute, userController.loginController);

// get-post form registración
routerUsers.get(routesUser.registerRoute, userController.registerController);
routerUsers.post(routesUser.registerRoute, registerValidations, upload.single("foto"), userController.addRegisterController);

routerUsers.get(routesUser.profileRoute, userController.profileController);

routerUsers.get(routesUser.listUsersRoute, userController.listUsersController);


module.exports = routerUsers;