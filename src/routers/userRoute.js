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
	users: '/',
	user: '/:id',
    registration: "/registration",
	login: "/login",
	edition: "/:id/edition",
    profile: "/:id/profile",
	purchases: "/:id/purchases",
	list: "/list",
	sales: "/sales",
    logout: "/logout",
    deletion: "/:id/deletion"
};

routerUsers.get(routesUser.registration, guestMiddleware, userController.registerController);
routerUsers.post(routesUser.users, upload.single("foto"), registerValidations, userController.addRegisterController);

routerUsers.get(routesUser.login, guestMiddleware , userController.loginController);
routerUsers.post(routesUser.login , loginValidations , userController.loginProcess);

routerUsers.get(routesUser.edition,authMiddleware, userController.editController);
routerUsers.put(routesUser.user, upload.single("foto"), editValidations, userController.updateEditController);

routerUsers.get(routesUser.profile, authMiddleware , userController.profileController);

routerUsers.get(routesUser.logout, userController.logoutController);

routerUsers.get(routesUser.purchases, authMiddleware, userController.compras);

routerUsers.get(routesUser.deletion,authMiddleware, userController.deleteController);
routerUsers.delete(routesUser.user,authMiddleware, userController.destroyController);
 
routerUsers.get(routesUser.list, authMiddleware, adminMiddleware, userController.listUsersController);

routerUsers.get(routesUser.sales, authMiddleware, adminMiddleware, userController.salesListController);

module.exports = routerUsers;