var express = require('express');
var router = express.Router();
const {loginRegister, edit, editProcess, createUser} = require('../controllers/usersController')
const uploadUsers = require('../utils/uploadProfilePic')

router.get('/ingresar',loginRegister);

router.get('/editar/:id',edit);
router.put('/editar/:id',editProcess);

router.post('/register', createUser);

module.exports = router;