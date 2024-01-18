const { Router } = require("express");
const userController = require("../controllers/userController");
const registerValidations = require("../middlewares/registerValidations");

//Sole
const path = require ('path');
const multer = require ('multer');

// Multer - manejo del almacenamiento-Sole
const storage = multer.diskStorage({
	destination: (req , file , cb) => {
		cb (null , path.resolve(__dirname , "../../public/images/usuarios"));
	},
	filename: (req , file , cb) => {
		cb (null , file.fieldname + "-" + Date.now() + path.extname(file.originalname))
	}
});

// Instanciar multer para manejar las imagenes-Sole
const upload = multer ({ storage });

//Manejo de rutas

const routerUsers = Router();

const routesUser = {
    loginRoute: "/login",
    registerRoute: "/register",
    editRegister: "/editUser/:idUser",
    profileRoute: "/profile"
};

routerUsers.get(routesUser.loginRoute, userController.loginController);

routerUsers.get(routesUser.registerRoute, userController.registerController);

routerUsers.get(routesUser.profileRoute, userController.profileController);

//editar y guardar registro de usuario, YA Registrado!
routerUsers.get(routesUser.editRegister, userController.editController);
routerUsers.put(routesUser.editRegister, upload.single("foto"), registerValidations, userController.updateEditController);

module.exports = routerUsers;