const db = require('../database/models')

module.exports = (req, res, next) => {
    const animals = db.Animal.findAll()
    const categories = db.Category.findAll()
    const subCategories = db.SubCategory.findAll()
    const labels = db.Label.findAll()

    Promise.all([animals, categories, subCategories, labels])
        .then((classifications) => {
            if (typeof req.files[0] !== 'undefined') {

                req.files.forEach(imagen => {

                    if (!(imagen.filename.includes(".png") || imagen.filename.includes(".jpg") || imagen.filename.includes(".jpeg") || imagen.filename.includes(".gif"))) {
                        return res.render('admin/productCreate', {
                            title: 'Crear producto',
                            errores: {
                                imgs: { msg: 'Solo archivos: JPG, JPEG, PNG y GIF' }
                            },
                            old: req.body,
                            classifications
                        })
                    }
                })
                next()
            } else {
                next()
            }
        })
        .catch(error => res.send(error))
    }