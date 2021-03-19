var express = require('express');
var router = express.Router();
const {profile, logout,productAdd, productList, createProcess, productDetail, productEdit, editProcess, productDelete} = require('../controllers/adminController')

const uploadProduct = require('../utils/uploadProduct')
const adminCheck = require('../middlewares/adminCheck');

router.get('/perfil', adminCheck,profile);
/* cerrar sesión */
router.get('/logout', logout)
/* Listar */
router.get('/products', adminCheck, productList)
/* Crear */
router.get('/products/create', adminCheck, productAdd);
router.post('/products/create', uploadProduct.any() ,createProcess);
/* detalle */
router.get('/products/:id', adminCheck, productDetail)
/* Editar */
router.get('/products/:id/edit', adminCheck, productEdit)
router.put('/products/:id', uploadProduct.any(), editProcess)
/* Borrar */
router.delete('/products/:id', productDelete)

module.exports = router;