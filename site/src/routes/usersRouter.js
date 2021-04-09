/* variables */
var express = require('express');
var router = express.Router();
const {loginRegister, edit, editProcess,loginProcess, createUser, profile, logout, deleteUser } = require('../controllers/usersController')

/* middlewares */
const uploadProfilePic = require('../utils/uploadProfilePic');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const editUserValidator = require('../validations/editUserValidator');
const checkUser = require('../middlewares/checkUser');
const sessionCheck = require('../middlewares/sessionCheck');
const imgUserValidator = require('../validations/imgUserValidator');

/* Formulario */
router.get('/ingresar', sessionCheck, loginRegister);
/* Registro */
router.post('/register', registerValidator, createUser); 
/* Login */
router.post('/ingresar', loginValidator, loginProcess);
/* Perfil */
router.get('/perfil', checkUser,profile);
/* Editar */
router.get('/editar/:id', checkUser,edit);
router.put('/editar/:id', uploadProfilePic.any(), imgUserValidator, editUserValidator, editProcess);
/* cerrar sesión */
router.get('/logout', logout)
/* Eliminar usuario */
router.delete('/delete/:id', deleteUser)

module.exports = router;