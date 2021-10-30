const router = require('express').Router();
const verify = require('./verifyToken')

router.get('/', verify, (req,res)=>{
    res.json({posts : {
        title: "posts",
        description : "verifier l'acces de l'utilisateur"
    }})

});

module.exports = router;
