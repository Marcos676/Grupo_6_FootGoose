const { check } = require('express-validator');

module.exports = [
    
    check('email')
        .notEmpty().withMessage('Se requiere el email.'),
    check('email')
        .isEmail().withMessage('El email no es válido.'),

    check('password')
        .notEmpty().withMessage('Se requiere la contraseña.')
]