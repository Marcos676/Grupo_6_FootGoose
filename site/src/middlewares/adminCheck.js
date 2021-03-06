module.exports = (req,res,next) => {
    let user = res.locals.user
    if(typeof user != "undefined" && user.admin){
        next() 
    }else{
        res.redirect("/sinpermisos")/* podria redirigir directamente a la pagina de loginRegister mostrando un mensaje de error como "Debe loguearse para ingresar" */
    }
    
}