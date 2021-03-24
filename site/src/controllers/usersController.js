const { getUsers, setUsers } = require('../data/users_db');
const bcrypt = require('bcrypt');

const { validationResult } = require('express-validator');

module.exports = {
    loginRegister: (req, res) => {
        res.render('users/loginRegister', {
            title: 'Iniciar sesión y registrarse'
        });
    },
    createUser: (req, res) => {
        let errores = validationResult(req);

        if (errores.isEmpty()) {
            let { name, email, password } = req.body;

            let passcrypt = bcrypt.hashSync(password, 10);

            let lastID = 0
            getUsers.forEach(user => {
                if (lastID < user.id) {
                    lastID = user.id
                }
            });
            let names= name.trim().split(" ")

            let newUser = {
                id: +lastID + 1,
                firstName: names[0],
                lastName: names[1],
                email: email.trim(),
                password: passcrypt,
                address: null,
                tel: null,
                img: "undefined.PNG",
                admin: 0,
                favoritos: []
            };

            getUsers.push(newUser);
            setUsers(getUsers);

            res.redirect('/usuario/perfil')

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
            let user = getUsers.find(usuario => {
                return usuario.email === email.trim()
            });
            if (bcrypt.compareSync(password.trim(),user.password)) {
                req.session.user = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
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
                    old: req.body
                })
            }
        } else {
            return res.render('users/loginRegister', {
                title: 'Iniciar sesión y registrarse',
                erroresLogin: errores.mapped(),
                old: req.body
            })
        }
    },
    profile: (req, res) => {
        let user = getUsers.find(usuario => {
            return usuario.id === req.session.user.id
        });
        

        res.render('users/profile', {
            title: 'Perfil',
            user
        })
    },
    edit: (req, res) => {

        let user = getUsers.find(result => {
            return result.id === +req.params.id
        });

        res.render('users/profileEdit', {
            title: 'Editar perfil',
            user
        })
    },
    editProcess: (req, res) => {
        
        let user = getUsers.find(result => {
            return result.id === +req.params.id
        });
        
        let errores = validationResult(req);
        if (errores.isEmpty()) {

            const { name, email, pass1, address, tel } = req.body;

            if (pass1.length > 0) {
                var passcrypt = bcrypt.hashSync(pass1, 12);
            } else {
                var passcrypt = user.password;
            }
            let names= name.trim().split(" ")

            const updatedList = {
                id: +req.params.id,
                firstName: names[0],
                lastName: names[1],
                email,
                password: passcrypt,
                address,
                tel,
                img: req.files[0]? req.files[0].filename : "undefined.PNG",
                admin: 0,
                favoritos: user.favoritos

            };
            
            getUsers.forEach((usuario, index) => {
                if (usuario.id === +req.params.id) {
                    getUsers.splice(index, 1, updatedList)
                }
            });
            setUsers(getUsers);

                req.session.user = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    img: user.img,
                    admin: user.admin
                }
                res.locals.localUser = req.session.user

                res.render('users/profile', {
                    title: 'Perfil',
                    user
                })
        } else {
            
            return res.render('users/profileEdit', {
                title: 'Editar perfil',
                errores: errores.mapped(),
                old: req.body,
                user
            })
        }
    },
    logout : (req,res) => {
        if (req.cookies.FootGoose) {
            res.cookie('FootGoose', '', { maxAge: -1 }); 
        }
        delete req.session.user
        res.redirect('/')
    }
}


