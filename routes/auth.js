const router = require('express').Router();
const User = require('../model/User')
const {RegisterValidation, loginValidation} = require('../validation')
const  bcrypt = require ('bcryptjs');
const { valid } = require('@hapi/joi');
const jwt = require('jsonwebtoken')
router.post('/login', async (req,res)=>{
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //verifier si l'email existe déjà
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(200).send("email n'existe pas")
    //verifier si le pwd est correcte
    const validpwd= await bcrypt.compare(req.body.password,user.password);
    if(!validpwd) return res.status(400).send('pwd est incorrecte');
    // créer un token
    const token = jwt.sign({_id : user._id}, process.env.SECRET_TOKEN);
    res.header('auth_token',token).send(token);
    
});
router.post('/register', async (req,res)=>{
    const {error} = RegisterValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //verifier si l'email existe déjà
    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) return res.status(400).send('email existe déjà')
    //hashage pwd
    const salt = await bcrypt.genSalt(10);
    const hashedpassword= await bcrypt.hash(req.body.password, salt)
      
    const user = new User({
        email: req.body.email,
        password : hashedpassword
    });
    try{
        const savedUser= await user.save();
        res.send({ user: user._id});
    }catch(err){
        res.status(400).send(err)
    }
});

module.exports= router;