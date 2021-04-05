module.exports = (req, res, next) => {
    if (!req.session.user) {
        return next()
    } else {
        if (req.session.user.admin === 0) {
            return res.redirect('/usuario/perfil')
        } else {
            return res.redirect('/admin/perfil')
        }
    }
}