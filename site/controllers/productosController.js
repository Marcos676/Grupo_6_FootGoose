

module.exports = {
    catalogo: (req, res) => {


        res.render('catalogo', {
            title: 'Catalogo'
        })
    },
	detalle : (req,res)=>{
        res.render("productDetail")
    },
    carrito: (req, res) => {

        
        res.render('productCart', {
            title: 'Carrito'
        })
    }
}