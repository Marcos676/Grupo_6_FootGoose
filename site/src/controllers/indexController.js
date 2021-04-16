const db = require('../database/models')

module.exports = {


    
    index: (req, res) => {
        const products = db.Product.findAll({
            include: [{ association: 'images' }, { association: 'label' }],
            order: [["sold", "DESC"]]
        })
        const animal = db.Animal.findAll()

        Promise.all([products, animal])
            .then(data => {
                return res.render('index', {
                    title: 'Home',
                    products: data[0],
                    animals: data[1],
                    data
                })
            })
            .catch(error => res.send(error))     
    },
    tyc: (req,res) => {
        res.render('tyc', {
            title: 'Términos y condiciones'
        })
    },
    rupert: (req,res) => {
        res.render('rupert', {
            title: 'RUPERT CONFIRMED?'
        })
    },
    faqs: (req,res) => {
        res.render('faqs', {
            title: 'Preguntas frecuentes'
        })
    },

}