module.exports = (req, res, next) => {
    if(req.cookies.userFootgoose){
        req.session.usuario = req.cookies.userFootgoose;
    }
    next()
}