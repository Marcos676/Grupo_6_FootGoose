var express = require('express');
var router = express.Router();
const {catalogo, detalle, carrito} = require('../controllers/productosController')


router.get('/',catalogo);
router.get('/detalle',detalle);
router.get('/carrito',carrito);

module.exports = router;