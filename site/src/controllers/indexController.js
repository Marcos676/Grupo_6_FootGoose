
module.exports = {
    index: (req, res) => {

        res.render('index', {
            title: 'Home'
        })
    },
    faqs: (req,res) => {

        res.render('faqs', {
            title: 'Preguntas frecuentes'
        })
    }

}