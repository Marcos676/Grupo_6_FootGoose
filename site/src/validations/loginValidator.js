const {check, body} = require('express-validator');
const {getUsers} = require('../data/users_db')
const bcrypt = require('bcrypt');

module.exports = [
    
    check('email')
    .isEmail().withMessage('El email no es válido.'),

     body('email').custom(value => {
        let result = getUsers.find(usuario => usuario.email === value);
        if(result){
            return true
        }else{
            return false
        }
    }).withMessage('Dirección de correo electrónico no registrada'),

    check('password')
    .notEmpty().withMessage('Se requiere la contraseña.'),

    body('password').custom((value, {req}) => {
        let user = getUsers.find(usuario => usuario.email === req.body.email);
        if(user){
            return true
        }else{
            return false
        }
    }).withMessage('Ingrese un email válido y su contraseña')
    
]