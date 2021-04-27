const db = require('../../database/models')

module.exports = {
    categories: (req, res) => {

        db.Animal.findOne({
            where: {
                id: req.params.animal
            },
            include: [{ association: 'category' }]
        })

            .then(animal => {

                let response = {
                    meta: {
                        status: 200 + " Todo OK",
                        url: '/api/categories/' + req.params.animal + '/categories',
                        length: animal.category.length
                    },
                    data: animal.category
                }
                res.json(response)
            })
            .catch(error => res.send(error))
    },
    subCategories: (req, res) => {

        db.Animal.findOne({
            where: {
                id: req.params.animal
            },
            include: [{
                association: 'category',
                where: {
                    id: req.params.category
                },
                include: [{
                    association: 'subCategory'
                }]
            }]
        })

            .then(animal => {

                let response = {
                    meta: {
                        status: 200 + " Todo OK",
                        url: `/api/categories/${req.params.animal}/${req.params.category}/subcategories`,
                        length: animal.category[0].subCategory.length
                    },
                    data: animal.category[0].subCategory
                }

                return res.json(response)
            })
            .catch(error => res.send(error))
    }
}