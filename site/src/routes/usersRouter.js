/* variables */
var express = require('express');
var router = express.Router();
const {loginRegister, edit, editProcess,loginProcess, createUser, profile, logout } = require('../controllers/usersController')

/* middlewares */
const uploadProfilePic = require('../utils/uploadProfilePic');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const editUserValidator = require('../validations/editUserValidator');
const checkUser = require('../middlewares/checkUser');
const sessionCheck = require('../middlewares/sessionCheck');
const imgUserCheck = require('../middlewares/imgUserCheck');

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
router.put('/editar/:id', uploadProfilePic.any(), imgUserCheck, editUserValidator, editProcess);
/* cerrar sesión */
router.get('/logout', logout)

module.exports = router;