const { getProducts } = require('../data/products_db');

const db = require('../database/models')

module.exports = {
    catalogo: (req, res) => {
      /*   res.render('catalogo', {
            title: 'Catalogo',
            products: getProducts
        }) */



        db.Products.findAll({
            include: [{association: 'images'}]
        })
        .then(products => {
            return  res.render('catalogo', {
                title: 'Catalogo',
                products
            })
        })
        .catch(error => res.send(error))
    },
    detalle: (req, res) => {
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