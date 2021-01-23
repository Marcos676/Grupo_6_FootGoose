

module.exports = {
    catalogo: (req, res) => {


        res.render('catalogo', {
            title: 'Catalogo'
        })
    },
    detalle: (req, res) => {


        res.render('productDetail', {
            title: 'Detalle'
        })
    },
    carrito: (req, res) => {

        
        res.render('productCart', {
            title: 'Carrito'
        })
    }
}