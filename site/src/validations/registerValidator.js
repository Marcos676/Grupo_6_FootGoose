const { check, body } = require('express-validator');

module.exports = [
    check('name')
        .notEmpty().withMessage('Se requiere su nombre'),

    check('email')
        .notEmpty().withMessage('Se requiere el email.'),
    check('email')
        .isEmail().withMessage('El email no es válido'),

    check('password')
        .notEmpty().withMessage('Se requiere la contraseña.'), 
    check('password')
        .isLength({
            min: 6,
            max: 32
        }).withMessage('La contraseña debe tener entre 6 y 36 caracteres'),

    body('confirmacion').custom((value, { req }) => {
        if (value !== req.body.password) {
            return false
        } else {
            return true
        }
    }).withMessage('Las contraseñas no coinciden!!')

]