const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv').config()
const rateLimit = require("express-rate-limit");

//Limit request : 10 per sec
const limiter = rateLimit({
  windowMs: 1000,  // 1 second
  max: 10 // limit each IP to 100 requests per windowMs
});

//Imports of sauce and user routes 
const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')

//Connection to mongoDB
mongoose.connect(`${process.env.ADMINFULL}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
    
//Use Express with const app
const app = express()

//Setup headers
app.use((req, res, next) =>   {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

//Use body-parser for parsing bodies request
app.use(bodyParser.json())

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes)
app.use(limiter)

module.exports = app
