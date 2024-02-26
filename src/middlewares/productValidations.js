const {body} = require ("express-validator");
const path = require('path');

const productValidations = [
    body("mascota").notEmpty().withMessage("Debes seleccionar una opción de mascota"),
    body("nombreprod")
        .notEmpty().withMessage("El campo nombre no puede quedar vacío").bail()
        .isLength({max: 40}).withMessage("El nombre no puede tener más de 40 caracteres"),
    body("precio")
        .notEmpty().withMessage("El campo precio no puede quedar vacío").bail()
        .custom(value => {
            // Validamos que sea un número decimal con un máximo de 5 enteros y 2 decimales
            if (!body("precio").isDecimal(value, { decimal_digits: '1,2', force_decimal: true })) {
                throw new Error('El precio debe ser un número decimal con un máximo de 5 enteros y 2 decimales');
            }
    
            // Extraemos la parte entera y decimal del número
            const [entero, decimal] = (value || '').split('.');
    
            // Validamos que tenga un máximo de 5 enteros
            if (entero.length > 5) {
                throw new Error('El precio no puede tener más de 5 dígitos en la parte entera');
            }
    
            // Validamos la existencia de decimal antes de verificar la longitud
            if (decimal && decimal.length > 2) {
                throw new Error('El precio no puede tener más de 2 dígitos en la parte decimal');
            }
    
            return true;
          }),
    body("categoria").notEmpty().withMessage("Debes seleccionar una categoria"),
    body("marca").notEmpty().withMessage("Debes seleccionar una marca"),
    body("edadmascota").notEmpty().withMessage("Debes seleccionar una edad de mascota"),
    body("tamaniomascota").notEmpty().withMessage("Debes seleccionar un tamaño de mascota"),
    body("descripcion").notEmpty().withMessage("El campo descripción no puede quedar vacío"),
    body("stock")
        .notEmpty().withMessage("El campo stock no puede quedar vacío").bail()
        .isInt().withMessage("El stock debe ser un número entero")
];

module.exports = productValidations ; 