const { getProducts, setProducts } = require('../data/products_db')
const { getUsers } = require('../data/users_db');

module.exports = {
    profile: (req, res) => {
        let user = getUsers.find(usuario => {
            return usuario.id === req.session.user.id
        });
        res.render('admin/adminProfile', {
            title: 'Perfil',
            user
        })
    },
    logout : (req,res) => {
        if (req.cookies.FootGoose) {
            res.cookie('FootGoose', '', { maxAge: -1 }); 
        }
        delete req.session.user
        res.redirect('/')
    },
    productList: (req, res) => {

        res.render('admin/products', {
            title: 'Lista de productos',
            products: getProducts
        })
    },
    productAdd: (req, res) => {

        res.render('admin/productCreate', {
            title: 'Crear producto'
        })
    },
    createProcess: (req, res) => {
        let {animal, category, subCategory, name, description, cuantity, price, label, discount, expiration, finalPrice} = req.body

        let lastID = 0
        getProducts.forEach(product => {
            if (lastID < product.id) {
                lastID = product.id
            }
        });

        let images = []
        req.files.map(nombre => {
            images.push(nombre.filename)
        })

        newProduct = {
            id: +lastID + 1,
            name,
            description,
            img: images,
            animal,
            category,
            subCategory,
            cuantity: +cuantity,
            price: +price,
            discount: +discount,
            label,
            expiration,
            finalPrice: +finalPrice
        }
        
        getProducts.push(newProduct)

        setProducts(getProducts)

        res.redirect('/admin/products')
    },
    productDetail: (req, res) => {

        let id = req.params.id

        let producto = getProducts.find(product => {
            return product.id === +id
        });

        res.render('admin/productDetail', {
            title: 'Detalle',
            product: producto,
            img: producto.img
        })
    },
    productEdit: (req,res) => {
        let id = req.params.id
        
        let producto = getProducts.find(product => {
            return product.id === +id
        });

        res.render('admin/productEdit', {
            title: 'Editar',
            product: producto
        })
    },
    editProcess: (req,res) => {

        let {name, description, animal, category, subCategory, cuantity, price, discount, label, expiration, finalPrice} = req.body

        let id = req.params.id
        
        let images = []
        req.files.map(nombre => {
            images.push(nombre.filename)
        })
        
        const updatedList = {
			id: +id,
			name,
            description,
            img: images,
            animal,
            category,
            subCategory,
            cuantity: +cuantity,
			price: +price,
			discount: +discount,
            finalPrice: +finalPrice,
			label,
			expiration
		}

        getProducts.forEach((product, index) => {
            if (product.id === +id) {
                getProducts.splice(index, 1, updatedList)
            }
        })

        setProducts(getProducts)

        res.redirect('/admin/products')
    },
    productDelete: (req,res) => {
        let id = req.params.id
        let updatedList = getProducts.filter(producto => {
            return producto.id !== +id
        })
        
        setProducts(updatedList)

        res.redirect('/admin/products')
    }
}