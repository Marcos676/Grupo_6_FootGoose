const db = require('../database/models')

module.exports = {
    profile: (req, res) => {
        db.Users.findOne({
            where: {
                id: req.session.user.id
            }
        })
            .then(user => {
                res.render('admin/adminProfile', {
                    title: 'Perfil',
                    user
                })
            })
            .catch(error => res.send(error))
    },
    logout: (req, res) => {
        if (req.cookies.FootGoose) {
            res.cookie('FootGoose', '', { maxAge: -1 });
        }
        delete req.session.user
        res.redirect('/')
    },
    productList: (req, res) => {

        db.Products.findAll({
            include: [{ association: 'images' }]
        })
            .then(products => {
                return res.render('admin/products', {
                    title: 'Lista de productos',
                    products
                })
            })
            .catch(error => res.send(error))
    },
    productAdd: (req, res) => {
        const animals = db.Animals.findAll()
        const categories = db.Categories.findAll()
        const subCategories = db.SubCategories.findAll()
        const labels = db.Labels.findAll()

        Promise.all([animals, categories, subCategories, labels])
            .then((classifications) => {
                return res.render('admin/productCreate', {
                    title: 'Crear producto',
                    classifications
                })
            })
            .catch(error => res.send(error))
    },
    createProcess: (req, res) => {
        let { subCategory, name, description, cuantity, price, label, discount, expiration, finalPrice } = req.body

        db.Products.create({
            name,
            description,
            cuantity: +cuantity,
            price: +price,
            discount,
            expiration,
            final_price: finalPrice,
            sub_category_id: +subCategory,
            label_id: label
        })
            .then((product) => {
                if (typeof req.files[0] !== 'undefined') {
                    var imgs = req.files.map(nombre => {
                        return db.ProductsImages.create({
                            img_name: nombre.filename,
                            product_id: product.id
                        })
                    })
                } else {
                    var imgs = db.ProductsImages.create({
                        product_id: product.id
                    })
                    imgs = [imgs]
                }
                Promise.all(imgs)
                    .then((imgs) => {
                        return res.redirect('/admin/products')
                    })
            })
            .catch(error => res.send(error))
    },
    productDetail: (req, res) => {
        db.Products.findOne({
            where: {
                id: req.params.id
            },
            include: [
                { association: 'images' },
                { association: 'label' },
                {
                    association: 'subCategory',
                    include: [
                        {
                            association: 'category',
                            include: [{ association: 'animal' }]
                        }]
                }
            ]
        })
            .then((product) => {
                return res.render('admin/productDetail', {
                    title: 'Detalle',
                    product
                })
            })
            .catch(error => res.send(error))
    },
    productEdit: (req, res) => {
        const animals = db.Animals.findAll()
        const categories = db.Categories.findAll()
        const subCategories = db.SubCategories.findAll()
        const labels = db.Labels.findAll()
        let product = db.Products.findOne({
            where: {
                id: req.params.id
            },
            include: [
                { association: 'images' },
                { association: 'label' },
                {
                    association: 'subCategory',
                    include: [
                        {
                            association: 'category',
                            include: [{ association: 'animal' }]
                        }]
                }
            ]
        })
        Promise.all([animals, categories, subCategories, labels, product])
            .then((dataProduct) => {
                return res.render('admin/productEdit', {
                    title: 'Detalle',
                    dataProduct,
                })
            })
            .catch(error => res.send(error))
    },
    editProcess: (req, res) => {
        let { name, description, subCategory, cuantity, price, discount, label, expiration, finalPrice } = req.body

        db.Products.update({
            name,
            description,
            cuantity: +cuantity,
            price: +price,
            discount,
            expiration,
            final_price: finalPrice,
            sub_category_id: +subCategory,
            label_id: label
        },
            { where: { id: req.params.id } })

            .then((product) => {
                if (typeof req.files[0] !== 'undefined') {
                    db.ProductsImages.destroy({
                        where: {
                            product_id: req.params.id
                        }
                    })
                    var imgs = req.files.map(nombre => {
                        return db.ProductsImages.create({
                            img_name: nombre.filename,
                            product_id: req.params.id
                        })
                    })
                } else {
                    var imgs = []
                }
                Promise.all(imgs)
                    .then((imgs) => {
                        return res.redirect('/admin/products')
                    })
                    .catch(error => res.send(error))
            })
            .catch(error => res.send(error))
    },
    productDelete: (req, res) => {
        const product = db.Products.destroy({
            where: {
                id: req.params.id
            }
        })
        const images = db.ProductsImages.destroy({
            where: {
                product_id: req.params.id
            }
        })
        Promise.all([product, images])
            .then(() => {
                res.redirect('/admin/products')
            })
            .catch(error => res.send(error))
    }
}