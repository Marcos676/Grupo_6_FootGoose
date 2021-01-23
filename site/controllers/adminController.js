

module.exports = {
    productAdd: (req, res) => {

        res.render('admin/productAdd', {
           title: 'Crear producto' 
          })
      }
}