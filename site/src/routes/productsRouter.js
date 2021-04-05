var express = require('express');
var router = express.Router();

const {catalogo, detalle, carrito, search, animal, category, subCategory} = require('../controllers/productosController')
const checkUser = require('../middlewares/checkUser');

router.get('/',catalogo);
router.get('/detalle/:id',detalle);
router.get('/carrito', checkUser,carrito);
router.get('/search',search);
router.get('/filtro/:animalId',animal);
router.get('/filtro/:animalId/:categoryId',category);
router.get('/filtro/:animalId/:categoryId/:subCategoryId',subCategory);

module.exports = router;