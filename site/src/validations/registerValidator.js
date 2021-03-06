const fs = require('fs');
const {check, body} = require('express-validator');
const {getUsers} = require('../data/users_db')

module.exports = [
    check('username')
    .notEmpty().withMessage('el username es requerido'),

    check('email')
    .isEmail().withMessage('debe ser un email válido'),

    body('email').custom(value => {
        let result = getUsers.find(user => user.email === value);

        if(result){
            return false
        }else{
            return true
        }
    }).withMessage('El email está registrado'),

    check('pass')
    .isLength({
        min : 6,
        max : 12
    }).withMessage('la contraseña debe tener un minimo de 6, máximo  de 12 caracteres'),

    body('pass2').custom((value, {req}) => {
        if(value !== req.body.pass){
            return false
        }else{
            return true
        }
    }).withMessage('las contraseñas no coinciden!!')

]