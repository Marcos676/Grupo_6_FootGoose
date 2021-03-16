module.exports = (req,res,next) => {
    if(req.session.user){
        res.locals.localUser = req.session.user;  
    }
    next()
}