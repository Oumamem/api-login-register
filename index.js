const express= require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
dotenv.config();
//se connecter à la BD
mongoose.connect(
    process.env.DB_CONNECT,{useNewUrlParser: true},
    ()=> console.log('db est connectée!'))
//importation des routes

//middleware
app.use(express.json());
//middlewares routes
app.use('/api/user', authRoute)

app.listen(8080, ()=>{ console.log('server running..')});