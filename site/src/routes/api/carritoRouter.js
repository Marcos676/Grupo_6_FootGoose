var express = require('express');
var router = express.Router();

const  {agregarItem,quitarItem,mostrarCarrito, vaciarCarrito} = require('../../controllers/api/carritoController')

router.get('/agregar/:id/:cantidad',agregarItem); //obtengo datos del producto para insertar en la lista de carrito
router.get('/quitar/:id',quitarItem);//quito y muestro
router.get('/listar',mostrarCarrito);//muestro
router.get('/vaciar',vaciarCarrito)//vacio y muestro

module.exports = router