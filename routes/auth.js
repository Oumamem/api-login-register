const router = require('express').Router();
const User = require('../model/User')
const {RegisterValidation} = require('../validation')
const {loginValidation} = require('../validation')


router.post('/register', async (req,res)=>{
    const {error} = RegisterValidation(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
    }  
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