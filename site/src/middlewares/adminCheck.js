module.exports = (req,res,next) => {
    let user = req.session.user
    typeof user != "undefined" && user.admin === 1? next() : res.redirect("/usuario/ingresar")
}