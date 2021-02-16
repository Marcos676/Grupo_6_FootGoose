var express = require('express');
var router = express.Router();
const {productAdd, productList, createProcess, productDetail, productEdit, editProcess, productDelete} = require('../controllers/adminController')

/* Listar */
router.get('/products', productList)
/* Crear */
router.get('/products/create', productAdd);
router.post('/products/create', createProcess);
/* detalle */
router.get('/products/:id', productDetail)
/* Editar */
router.get('/products/:id/edit', productEdit)
router.put('/products/:id', editProcess)
/* Borrar */
router.delete('/products/:id', productDelete)

module.exports = router;