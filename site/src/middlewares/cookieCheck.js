module.exports = (req, res, next) => {
    if(req.cookies.FootGoose){
        req.session.user = req.cookies.FootGoose;
    }
    next()
}