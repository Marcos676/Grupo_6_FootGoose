const path = require('path')
const multer = require('multer')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/productos')
    },
    filename: function (req, file, cb) {
      cb(null,'products-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })

  module.exports = upload