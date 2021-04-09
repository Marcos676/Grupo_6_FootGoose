const db = require('../database/models')
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


module.exports = {
    profile: (req, res) => {
        db.User.findOne({
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
    createAdmin: (req, res) => {
        db.User.findOne({
            where: {
                id: req.session.user.id
            }
        })
            .then(user => {
                res.render('admin/adminCreate', {
                    title: 'Creación de Admin',
                    user
                })
            })
            .catch(error => res.send(error))
    },
    createAdminProcess: (req, res) => {
        let errores = validationResult(req);

        if (errores.isEmpty()) {
            let { name, email, password } = req.body;

            db.User.findOne({
                where: {
                    email: email.trim()
                }
            })
                .then(user => {
                    if (user) {
                        return res.render('admin/adminCreate', {
                            title: 'Creación de Admin',
                            erroresRegister: {
                                email: {
                                    msg: 'Este email ya está registrado'
                                }
                            },
                            oldRegister: req.body,
                            regValid: 'validacion positiva',
                            regInvalid: 'validacion negativa'
                        })
                    }

                    let passcrypt = bcrypt.hashSync(password, 10);

                    let names = name.trim().split(" ")

                    db.User.create({
                        firstName: names[0],
                        lastName: names[1],
                        email: email.trim(),
                        password: passcrypt,
                        admin: 1
                    })
                        .then(user => {
                            res.render('admin/adminProfile', {
                                title: 'Perfil',
                                user
                            })
                        })
                        .catch(error => res.send(error))
                })

        } else {
            return res.render('admin/adminCreate', {
                title: 'Creación de Admin',
                erroresRegister: errores.mapped(),
                oldRegister: req.body,
                regValidPass: 'validacion positiva'

            })
        }
    },
    logout: (req, res) => {
        if (req.cookies.FootGoose) {
            res.cookie('FootGoose', '', { maxAge: -1 });
        }
        delete req.session.user
        res.redirect('/')
    },
    productAdd: (req, res) => {
        const animals = db.Animal.findAll()
        const categories = db.Category.findAll()
        const subCategories = db.SubCategory.findAll()
        const labels = db.Label.findAll()

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
        let errores = validationResult(req);

        if (!errores.isEmpty()) {
            const animals = db.Animal.findAll()
            const categories = db.Category.findAll()
            const subCategories = db.SubCategory.findAll()
            const labels = db.Label.findAll()

            Promise.all([animals, categories, subCategories, labels])
                .then((classifications) => {
                    return res.render('admin/productCreate', {
                        title: 'Crear producto',
                        classifications,
                        old: req.body,
                        errores: errores.mapped(),
                    })
                })
                .catch(error => res.send(error))
        }

        let { subCategory, name, description, cuantity, price, label, discount, expiration, finalPrice } = req.body

        db.Product.create({
            name,
            description,
            cuantity: +cuantity,
            price: +price,
            discount,
            expiration,
            finalPrice: finalPrice,
            subCategoryId: +subCategory,
            labelId: label
        })
            .then((product) => {
                if (typeof req.files[0] !== 'undefined') {

                    var imgs = req.files.map(nombre => {

                        return db.ImageProduct.create({
                            imgName: nombre.filename,
                            productId: product.id 
                        })
                    })
                } else {
                    var imgs = db.ImageProduct.create({
                        imgName: 'undefinedProduct.png',
                        productId: product.id
                    })
                    imgs = [imgs]
                }
                Promise.all(imgs)
                    .then((imgs) => {
                        return res.redirect('/productos')
                    })
            })
            .catch(error => res.send(error))


    },
    productDetail: (req, res) => {
        db.Product.findOne({
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
        const animals = db.Animal.findAll()
        const categories = db.Category.findAll()
        const subCategories = db.SubCategory.findAll()
        const labels = db.Label.findAll()
        let product = db.Product.findOne({
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
                    title: 'Editar Producto',
                    dataProduct,
                })
            })
            .catch(error => res.send(error))
    },
    editProcess: (req, res) => {
        let errores = validationResult(req);

        if (!errores.isEmpty()) {
            const animals = db.Animal.findAll()
            const categories = db.Category.findAll()
            const subCategories = db.SubCategory.findAll()
            const labels = db.Label.findAll()
            let product = db.Product.findOne({
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
                        title: 'Editar Producto',
                        old: req.body,
                        errores: errores.mapped(),
                        dataProduct
                    })
                })
        }

        let { name, description, subCategory, cuantity, price, discount, label, expiration, finalPrice } = req.body

        db.Product.update({
            name,
            description,
            cuantity: +cuantity,
            price: +price,
            discount,
            expiration,
            finalPrice: finalPrice,
            subCategoryId: +subCategory,
            labelId: label
        },
            { where: { id: req.params.id } })

            .then((product) => {
                if (typeof req.files[0] !== 'undefined') {
                    db.ImageProduct.destroy({
                        where: {
                            productId: req.params.id
                        }
                    })
                    var imgs = req.files.map(nombre => {
                        return db.ImageProduct.create({
                            imgName: nombre.filename,
                            productId: req.params.id
                        })
                    })
                } else {
                    var imgs = []
                }
                Promise.all(imgs)
                    .then((imgs) => {
                        return res.redirect('/productos')
                    })
                    .catch(error => res.send(error))
            })
            .catch(error => res.send(error))
    },
    productDelete: (req, res) => {
        const product = db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        const images = db.ImageProduct.destroy({
            where: {
                productId: req.params.id
            }
        })
        const favorite = db.Favorite.destroy({
            where: {
                productId: req.params.id
            }
        })
        const cart = db.Cart.destroy({
            where: {
                productId: req.params.id
            }
        })
        Promise.all([product, images, favorite, cart])
            .then(() => {
                res.redirect('/productos')
            })
            .catch(error => res.send(error))
    }
}