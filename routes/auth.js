const router = require('express').Router();
const User = require('../model/User')
const {RegisterValidation} = require('../validation')
const {loginValidation} = require('../validation')


router.post('/register', async (req,res)=>{
    const {error} = RegisterValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //verifier si le username existe déjà
    const usernameExist = await User.findOne({username: req.body.username})
    if (usernameExist) return res.status(400).send('username existe déjà')
    
      
    const user = new User({
        username: req.body.username,
        password : req.body.password
    });
    try{
        const savedUser= await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err)
    }
});

module.exports= router;