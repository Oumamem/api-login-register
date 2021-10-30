const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    const token = req.header('auth_token');
    if(!token) return res.status(401).send('Accès interdit');
    try{
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user=verified;
        next();
    }catch(err){
        res.status(401).send("token n'est pas vérifié")
    }
}
