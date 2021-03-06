/* variables */

var express = require('express');
var router = express.Router();
const {loginRegister, edit, editProcess,loginProcess } = require('../controllers/usersController')

/* middlewares */
const uploadProduct = require('../utils/uploadProduct');
const registerValidator = require('../validations/registerValidator');
const checkUser = require('../middlewares/checkUser');
const loginValidator = require('../validations/loginValidator');


router.get('/ingresar',loginRegister);
router.post('/logeo', loginProcess);

router.get('/editar/:id',edit);
router.put('/editar/:id',editProcess);

router.get('/register',loginRegister); 

module.exports = router;