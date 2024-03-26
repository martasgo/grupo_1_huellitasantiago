const db = require('../model/database/models');
const Op = db.Sequelize.Op;

const {body} = require ("express-validator");


const loginValidations = [
    body("email").notEmpty().withMessage("El campo email no puede quedar vacío").bail()
    .isEmail().withMessage("Debes ingresar un email válido"),
    body("contraseña").notEmpty().withMessage("El campo contraseña no puede quedar vacío")
];

module.exports = loginValidations;