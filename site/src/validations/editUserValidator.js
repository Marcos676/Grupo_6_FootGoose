const { check, body } = require('express-validator');
const { getUsers } = require('../data/users_db');
const bcrypt = require('bcrypt');

module.exports = [
    check('name')
        .notEmpty().withMessage('Se requiere su nombre'),

    check('email')
        .isEmail().withMessage('El email no es válido'),

    body('email').custom((value, { req }) => {
        let user = getUsers.find(result => result.id === +req.params.id);
        if (user && user.email !== value) {
            return false
        } else {
            return true
        }
    }).withMessage('Este email ya está registrado'),

    body('password').custom((value, { req }) => {
        let user = getUsers.find(result => result.id === +req.params.id);
        if (bcrypt.compareSync(value.trim(), user.password)) {
            return true
        } else {
            if (value.length === 0) {
                return true
            }
            return false
        }
    }).withMessage('Contraseña incorrecta'),

    /* pass1 */
    body('pass1').custom((value, { req }) => {
        if (req.body.password.length === 0 && value.length === 0) {
            return true
        } else {
            if (req.body.password.length > 0 && value.length > 0) {
                return true
            }
            return false
        }
    }).withMessage('Completo los campos de contraseña'),

    body('pass1').custom((value, {req}) => {
        if ((value.length >= 6 && value.length <= 32) || (req.body.password.length === 0 && value.length === 0)) {
            return true
        } else {
            return false
        }
    }).withMessage('La contraseña debe tener entre 6 y 36 caracteres'),

    body('pass2').custom((value, { req }) => {
        if (value !== req.body.pass1) {
            return false
        } else {
            return true
        }
    }).withMessage('Las contraseñas no coinciden!!')

]