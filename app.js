const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user')

mongoose.connect('mongodb+srv://ThibS:14y3X3DDA3FPSrFA@cluster0.ffla6.mongodb.net/OPC-project_6?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
const app = express()

app.use((req, res, next) =>   {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes)

module.exports = app
