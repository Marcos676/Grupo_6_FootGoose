const {getProducts, setProducts} = require('../data/products_db');

module.exports = {
    catalogo: (req, res) => {


        res.render('catalogo', {
            title: 'Catalogo',
            products: getProducts
        })
    },
	detalle : (req,res)=>{
        res.render("productDetail", {
            title: 'Detalle'
        })
    },
    carrito: (req, res) => {

        
        res.render('productCart', {
            title: 'Carrito'
        })
    }
}