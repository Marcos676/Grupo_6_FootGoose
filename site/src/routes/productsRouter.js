var express = require('express');
var router = express.Router();

const {catalogo, detalle, carrito, search, animal, category, subCategory} = require('../controllers/productosController')
const checkUser = require('../middlewares/checkUser');

/* detalle */
router.get('/detalle/:id',detalle);
/* carrito */
router.get('/carrito', checkUser,carrito);
/* Buscador */
router.get('/search',search);
/* filtro sub categoria */
router.get('/filtro/animal/:animalId/category/:categoryId/sub-category/:subCategoryId/:pag?',subCategory);
/* Filtro categoria */
router.get('/filtro/animal/:animalId/category/:categoryId/:pag?',category);
/* filtro animal */
router.get('/filtro/animal/:animalId/:pag?',animal);
/* Listado */
router.get('/:pag?',catalogo);

module.exports = router;