var express = require('express');
var router = express.Router();
const {index, faqs, rupert} = require('../controllers/indexController')


router.get('/',index);
router.get('/preguntas-frecuentes',faqs);
router.get('/rupert', rupert)


module.exports = router;
