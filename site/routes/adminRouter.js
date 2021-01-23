var express = require('express');
var router = express.Router();
const {productAdd} = require('../controllers/adminController')


router.get('/crear', productAdd);

module.exports = router;