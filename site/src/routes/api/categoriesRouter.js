var express = require('express');
var router = express.Router();

const { categories, subCategories } = require('../../controllers/api/categoriesController')


/* Category */
router.get('/:animal/categories', categories)

/* Subcategory */
router.get('/:animal/:category/subcategories', subCategories)


module.exports = router;