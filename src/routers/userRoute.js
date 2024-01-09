const { Router } = require("express");
const userController = require("../controllers/userController");
const {body} = require ("express-validator");
const loginValidations = require ("../middlewares/loginValidations");
const guestMiddleware = require ("../middlewares/guestMiddleware");
const authMiddleware = require ("../middlewares/authMiddleware");

const routerUsers = Router();

const routesUser = {
    loginRoute: "/login",
    registerRoute: "/register",
    profileRoute: "/profile"
};

routerUsers.get(routesUser.loginRoute, guestMiddleware , userController.loginController);
routerUsers.get(routesUser.registerRoute, guestMiddleware , userController.registerController);
routerUsers.get(routesUser.profileRoute, authMiddleware , userController.profileController);
routerUsers.post(routesUser.loginRoute , loginValidations , userController.loginProcess);

module.exports = routerUsers;