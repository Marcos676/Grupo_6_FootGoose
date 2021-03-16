module.exports = (req,res,next) => {
    if(req.session.user && req.session.user.admin === 0){
        next()
    }else{
        res.redirect('/usuario/ingresar')
    }
}