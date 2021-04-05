const db = require('../database/models')

module.exports = (req, res, next) => {
    const animals = db.Animals.findAll()
    const categories = db.Categories.findAll()
    const subCategories = db.SubCategories.findAll()
    const labels = db.Labels.findAll()
    let product = db.Products.findOne({
        where: {
            id: req.params.id
        },
        include: [
            { association: 'images' },
            { association: 'label' },
            {
                association: 'subCategory',
                include: [
                    {
                        association: 'category',
                        include: [{ association: 'animal' }]
                    }]
            }
        ]
    })

    Promise.all([animals, categories, subCategories, labels, product])
        .then((dataProduct) => {
            if (typeof req.files[0] !== 'undefined') {

                req.files.forEach(imagen => {

                    if (!(imagen.filename.includes(".png") || imagen.filename.includes(".jpg") || imagen.filename.includes(".jpeg") || imagen.filename.includes(".gif"))) {
                        return res.render('admin/productEdit', {
                            title: 'Editar Producto',
                            errores: {
                                imgs: { msg: 'Solo archivos: JPG, JPEG, PNG y GIF' }
                            },
                            old: req.body,
                            dataProduct
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