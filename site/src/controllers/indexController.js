const db = require('../database/models')

module.exports = {
    index: (req, res) => {
        db.Animal.findAll()
        .then(animals => {
            res.render('index', {
                title: 'Home',
                animals
            })
        })
        .catch(error => res.send(error))        
    },
    faqs: (req,res) => {
        res.render('faqs', {
            title: 'Preguntas frecuentes'
        })
    }

}