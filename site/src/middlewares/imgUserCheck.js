const db = require('../database/models')

module.exports = (req, res, next) => {
    db.Users.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(user => {
            if (typeof req.files[0] !== 'undefined') {
                req.files.map(imagen => {
                    if (!imagen.filename.includes('.jpg' || '.png' || '.jpeg' || '.gif')) {
                        return res.render('users/profileEdit', {
                            title: 'Editar perfil',
                            errores: {
                                img: { msg: 'Solo archivos: JPG, JPEG, PNG y GIF' }
                            },
                            old: req.body,
                            user
                        })
                    } else {
                        next()
                    }
                })
            } else {
                next()
            }
        })
        .catch(error => res.send(error))
}