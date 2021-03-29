const { check, body } = require('express-validator');

module.exports = [
    check('name')
        .notEmpty().withMessage('Se requiere su nombre y apellido'),

        body('name').custom(value => {
            let names = value.trim().split(" ")
            if ( names.length === 1 ) {
                return false
            } else {
                return true
            }
        }).withMessage('Se requiere su nombre y apellido'),

    body('name').custom(value => {
        let names = value.trim().split(" ")
        if ((names[0].length > 2) || (names[1].length > 2)) {
            return true
        } else {
            return false
        }
    }).withMessage('El nombre y apellido deben tener más de 2 caracteres'),

    body('name').custom(value => {
        let names = value.trim().split(" ")
        if (names.length > 2) {
            return false
        } else {
            return true
        }
    }).withMessage('Si su apellido tiene 2 palabras escríbelo junto'),


    check('email')
        .notEmpty().withMessage('Se requiere el email'),
    check('email')
        .isEmail().withMessage('El email no es válido'),


    check('password')
        .notEmpty().withMessage('Se requiere la contraseña'),

    check('password')
        .isLength({
            min: 8
        }).withMessage('La contraseña debe tener como mínimo 8'),

        body('password').custom((value, { req }) => {
            let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[:!"#$%&'[()*+,\-./:;<=>?@^_`{|}:]).{8,}$/; 
            if (!regExPass.test(value)) {
                return false
            } else {
                return true
            }
        }).withMessage('Debe tener numeros, letras minúsculas, mayúsculas y caracteres especiales'),

    body('confirmacion').custom((value, { req }) => {
        if (value !== req.body.password) {
            return false
        } else {
            return true
        }
    }).withMessage('Las contraseñas no coinciden!!')

]