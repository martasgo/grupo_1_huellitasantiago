const { Router } = require("express");
const userController = require("../controllers/userController");
const {body} = require ("express-validator");
const loginValidations = require ("../middlewares/loginValidations");

const routerUsers = Router();

const routesUser = {
    loginRoute: "/login",
    registerRoute: "/register",
    profileRoute: "/profile"
};

routerUsers.get(routesUser.loginRoute, userController.loginController);
routerUsers.get(routesUser.registerRoute, userController.registerController);
routerUsers.get(routesUser.profileRoute, userController.profileController);
routerUsers.post(routesUser.loginRoute , loginValidations , userController.loginProcess);

module.exports = routerUsers;