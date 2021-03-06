const fs = require('fs');
const {check, body} = require('express-validator');
/* const usuarios = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8')); No necesitas parcearlo de nuevo */
/* Podes usar los metodos que deje en el users_db */
const {getUsers} = require('../data/users_db')
/* getUsers te trae todo el json ya parseado */

module.exports = [
    check('name')
    .notEmpty().withMessage('El nombre es requerido.'),

    check('email')
    .isEmail().withMessage('El email debe ser valido.'),

     body('email').custom(value => {
        let result = getUsers.find(usuario => usuario.email === value);
        if(result){
            return false
        }else{
            return true
        }
    }).withMessage('Ups! Este email ya esta registrado'),

    check('password')
    .notEmpty().withMessage('La contraseña es requerida.')
    .isLength({
        min: 4,
        max: 12
    }).withMessage('La contraseña debe tener un minimo de 4 y un máximo de 12 caracteres'),

    body('password2').custom((value, {req}) => {
        if (value !== req.body.password){
            return false
        }else{
            return true
        }
    }).withMessage('La contraseña es incorrecta')
]