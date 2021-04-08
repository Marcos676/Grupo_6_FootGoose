const db = require('../database/models')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

module.exports = {
    loginRegister: (req, res) => {
            res.render('users/loginRegister', {
                title: 'Iniciar sesión y registrarse',
            });
    },
    createUser: (req, res) => {
        let errores = validationResult(req);

        if (errores.isEmpty()) {
            let { name, email, password } = req.body;

            db.Users.findOne({
                where: {
                    email: email.trim()
                }
            })
                .then(user => {
                    if (user) {
                        return res.render('users/loginRegister', {
                            title: 'Iniciar sesión y registrarse',
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

                    db.Users.create({
                        first_name: names[0],
                        last_name: names[1],
                        email: email.trim(),
                        password: passcrypt,
                        admin: 0
                    })
                        .then(() => {
                            res.redirect('/usuario/perfil')
                        })
                        .catch(error => res.send(error))
                })
                .catch(error => res.send(error))

        } else {
            return res.render('users/loginRegister', {
                title: 'Iniciar sesión y registrarse',
                erroresRegister: errores.mapped(),
                oldRegister: req.body
            })
        }
    },
    loginProcess: (req, res) => {
        let errores = validationResult(req);

        if (errores.isEmpty()) {
            const { email, password, rememberme } = req.body;

            db.Users.findOne({
                where: {
                    email: email.trim()
                }
            })
                .then(user => {

                    if (!user) {
                        return res.render('users/loginRegister', {
                            title: 'Iniciar sesión y registrarse',
                            erroresLogin: {
                                email: { msg: 'Dirección de correo electrónico no registrada' }
                            },
                            old: req.body,
                          emailInvalid: 'validación negativa'  
                        })
                    }

                    if (bcrypt.compareSync(password.trim(), user.password)) {
                        req.session.user = {
                            id: user.id,
                            firstName: user.first_name,
                            lastName: user.last_name,
                            img: user.img,
                            admin: user.admin
                        }

                        if (rememberme) {
                            res.cookie('FootGoose', req.session.user, {
                                maxAge: 1000 * 60 * 60 * 24 * 7 /*La cookie vive por una semana*/
                            })
                        }
                        user.admin === 1 ? res.redirect('/admin/perfil') : res.redirect('/usuario/perfil')

                    } else {
                        return res.render('users/loginRegister', {
                            title: 'Iniciar sesión y registrarse',
                            erroresLogin: {
                                password: {
                                    msg: "Contraseña incorrecta"
                                }
                            },
                            old: req.body,
                            emailValid: 'validacion positiva',
                            passInvalid: 'validacion negativa'
                        })
                    }

                })
                .catch(error => res.send(error))
        } else {
            return res.render('users/loginRegister', {
                title: 'Iniciar sesión y registrarse',
                erroresLogin: errores.mapped(),
                old: req.body
            })
        }
    },
    profile: (req, res) => {
        db.Users.findOne({
            where: {
                id: req.session.user.id
            },
            include: [{ association: 'favorite' }]
        })
            .then(user => {
                res.render('users/profile', {
                    title: 'Perfil',
                    user
                })
            })
            .catch(error => res.send(error))
    },
    edit: (req, res) => {
        db.Users.findOne({
            where: { id: req.params.id }
        })
            .then(user => {
                res.render('users/profileEdit', {
                    title: 'Editar perfil',
                    user
                })
            })
            .catch(error => res.send(error))
    },
    editProcess: (req, res) => {
        let errores = validationResult(req);

        if (errores.isEmpty()) {
            const { name, email, password, pass1, address, tel } = req.body;

            const usuario = db.Users.findOne({
                where: {
                    id: req.params.id
                }
            })
            const emailSearch = db.Users.findOne({
                where: {
                    email: email
                }
            })
            Promise.all([usuario, emailSearch])
                .then(promise => {
                    if (promise[1] && email.trim() !== promise[0].email) {
                        return res.render('users/profileEdit', {
                            title: 'Editar perfil',
                            errores: {
                                email: { msg: 'Este email ya está registrado' }
                            },
                            user: promise[0],
                            old: req.body
                        })
                    }

                    if (bcrypt.compareSync(password.trim(), promise[0].password) || password.length === 0) {
                        if (pass1.length > 0) {
                            var passcrypt = bcrypt.hashSync(pass1, 12);
                        } else {
                            var passcrypt = promise[0].password;
                        }

                        let names = name.trim().split(" ")

                        db.Users.update({
                            first_name: names[0],
                            last_name: names[1],
                            email,
                            password: passcrypt,
                            address,
                            tel,
                            img: req.files[0] ? req.files[0].filename : promise[0].img,
                        }, {
                            where: { id: req.params.id }
                        })
                            .then(() => {
                                req.session.user = {
                                    id: promise[0].id,
                                    firstName: names[0],
                                    lastName: names[1],
                                    img: req.files[0] ? req.files[0].filename : promise[0].img,
                                    admin: promise[0].admin
                                }
                                res.locals.localUser = req.session.user

                                return res.render('users/profile', {
                                    title: 'Perfil',
                                    user: promise[0]
                                })
                            })
                            .catch(error => res.send(error))
                    } else {
                        return res.render('users/profileEdit', {
                            title: 'Editar perfil',
                            errores: {
                                password: { msg: "Contraseña incorrecta" }
                            },
                            user: promise[0],
                            old: req.body
                        })
                    }
                })
                .catch(error => res.send(error))
        } else {
            db.Users.findOne({
                where: {
                    id: req.params.id
                }
            })
                .then(user => {
                    return res.render('users/profileEdit', {
                        title: 'Editar perfil',
                        errores: errores.mapped(),
                        old: req.body,
                        user
                    })
                })
                .catch(error => res.send(error))
        }
    },
    logout: (req, res) => {
        if (req.cookies.FootGoose) {
            res.cookie('FootGoose', '', { maxAge: -1 });
        }
        delete req.session.user
        res.redirect('/')
    }
}


