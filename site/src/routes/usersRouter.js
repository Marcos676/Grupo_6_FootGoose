var express = require('express');
var router = express.Router();
const {loginRegister} = require('../controllers/usersController')


router.get('/ingresar',loginRegister);

module.exports = router;