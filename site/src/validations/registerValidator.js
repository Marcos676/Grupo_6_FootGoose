const {check, body} = require('express-validator');
const {getUsers} = require('../data/users_db')

module.exports = [
    check('name')
    .notEmpty().withMessage('Se requiere su nombre'),

    check('email')
    .isEmail().withMessage('El email no es válido'),

    body('email').custom(value => {
        let result = getUsers.find(user => user.email === value);
        if(result){
            return false
        }else{
            return true
        }
    }).withMessage('Este email ya está registrado'),

    check('password')
    .isLength({
        min : 6,
        max : 32
    }).withMessage('La contraseña debe tener entre 6 y 36 caracteres'),

    body('confirmacion').custom((value, {req}) => {
        if(value !== req.body.password){
            return false
        }else{
            return true
        }
    }).withMessage('Las contraseñas no coinciden!!')

]