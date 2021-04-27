var express = require('express');
var router = express.Router();
const {index, tyc, faqs, rupert} = require('../controllers/indexController')


router.get('/',index);
router.get('/tyc',tyc);
router.get('/rupert', rupert);
router.get('/faqs', faqs);


module.exports = router;
