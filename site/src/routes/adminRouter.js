var express = require('express');
var router = express.Router();
const {profile, logout,productAdd, productList, createProcess, productDetail, productEdit, editProcess, productDelete} = require('../controllers/adminController')

const uploadProduct = require('../utils/uploadProduct')
const adminCheck = require('../middlewares/adminCheck');
const productValidator = require('../validations/productValidator');
const imgsCreateProductValidator = require('../validations/imgsCreateProductValidator');
const imgsEditProductValidator = require('../validations/imgsEditProductValidator');


router.get('/perfil', adminCheck,profile);
/* cerrar sesión */
router.get('/logout', logout)
/* Crear */
router.get('/products/create', adminCheck, productAdd);
router.post('/products/create', uploadProduct.any(), imgsCreateProductValidator, productValidator, createProcess);
/* detalle */
router.get('/products/:id', adminCheck, productDetail)
/* Editar */
router.get('/products/:id/edit', adminCheck, productEdit)
router.put('/products/:id', uploadProduct.any(), imgsEditProductValidator, productValidator, editProcess)
/* Borrar */
router.delete('/products/:id', productDelete)

module.exports = router;