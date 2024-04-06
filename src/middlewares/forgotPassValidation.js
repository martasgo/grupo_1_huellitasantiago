const db = require('../model/database/models');
const Op = db.Sequelize.Op;

const {body} = require ("express-validator");


const forgotPassdValidation = [
    body("email").notEmpty().withMessage("El campo email no puede quedar vacío").bail()
    .isEmail().withMessage("Debes ingresar un email válido")    
];

module.exports = forgotPassdValidation;