var express = require('express');
var router = express.Router();
const {index, faqs} = require('../controllers/indexController')


router.get('/',index);
router.get('/preguntas-frecuentes',faqs);

module.exports = router;
