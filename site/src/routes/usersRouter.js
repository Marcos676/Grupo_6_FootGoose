var express = require('express');
var router = express.Router();
const {loginRegister, edit, editProcess} = require('../controllers/usersController')


router.get('/ingresar',loginRegister);

router.get('/editar/:id',edit);
router.put('/editar/:id',editProcess);

module.exports = router;