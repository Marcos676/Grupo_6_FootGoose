var express = require('express');
var router = express.Router();

const {catalogo, detalle, carrito, search, animal, category, subCategory} = require('../controllers/productosController')
const checkUser = require('../middlewares/checkUser');

/* detalle */
router.get('/detalle/:id',detalle);
/* carritp */
router.get('/carrito', checkUser,carrito);
/* Buscador */
router.get('/search',search);
/* filtro animal */
router.get('/filtro/:animalId/:pag?',animal);
/* Filtro categoria */
router.get('/filtro/:animalId/:categoryId/:pag?',category);
/* filtro sub categoria */
router.get('/filtro/:animalId/:categoryId/:subCategoryId/:pag?',subCategory);
/* Listado */
router.get('/:pag?',catalogo);

module.exports = router;