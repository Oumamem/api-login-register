const express= require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

const usersRoute = require('./routes/users')
dotenv.config();
//se connecter à la BD
mongoose.connect(
    process.env.DB_CONNECT,{useNewUrlParser: true},
    ()=> console.log('db est connectée!'))
//importation des routes

//middleware
app.use(express.json());
//middlewares routes
app.use('/', authRoute)
app.use('/posts', postRoute)
app.use('/users', usersRoute)

app.listen(8080, ()=>{ console.log('server running..')});