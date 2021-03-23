var express = require('express');
var router = express.Router();

const {catalogo, detalle, carrito} = require('../controllers/productosController')
const checkUser = require('../middlewares/checkUser');

router.get('/',catalogo);
router.get('/detalle/:id',detalle);
router.get('/carrito', checkUser,carrito);

module.exports = router;