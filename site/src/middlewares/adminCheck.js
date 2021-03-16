module.exports = (req,res,next) => {
    let user = res.locals.user
    if(typeof user != "undefined" && user.admin === 1){
        next() 
    }else{
        res.redirect("/usuario/ingresar")
    }
}