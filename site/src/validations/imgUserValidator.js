const db = require('../database/models')

module.exports = (req, res, next) => {
    db.User.findOne({
        where: {
            id: req.session.user.id
        }
    })
        .then(user => {
            if (typeof req.files[0] !== 'undefined') {

                    if (req.files[0].filename.includes(".png") || req.files[0].filename.includes(".jpg") || req.files[0].filename.includes(".jpeg") || req.files[0].filename.includes(".gif")) {
                        return next()

                    } else {
                        
                        return res.render('users/profileEdit', {
                            title: 'Editar perfil',
                            errores: {
                                img: { msg: 'Solo archivos: JPG, JPEG, PNG y GIF' }
                            },
                            old: req.body,
                            user
                        })
                    }
                
            } else {
                return next()
            }
        })
        .catch(error => res.send(error))
}