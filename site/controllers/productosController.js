

module.exports = {
    catalogo: (req, res) => {


        res.render('catalogo', {
            title: 'Catalogo'
        })
    },
	detail: (req, res) => {
		let producto = products.find(product=>{
            return product.id == req.params.productId
		});
		let title = "Detalles"
		res.render("detail", {title, producto, toThousand})
	},
    carrito: (req, res) => {

        
        res.render('productCart', {
            title: 'Carrito'
        })
    }
}