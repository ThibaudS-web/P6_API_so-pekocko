const express = require('express')

const mongoose = require('mongoose');
const Sauce = require('./models/Sauce')

mongoose.connect('mongodb+srv://ThibS:14y3X3DDA3FPSrFA@cluster0.ffla6.mongodb.net/OPC-project_6?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
  })

app.post('/api/sauces', (req, res, next) => {
  const sauce = new Sauce({
    ...req.body
  })
  sauce.save()
  .then(res.status(201).json({ message : "registered object !" }))
  .catch(error => res.status(400).json({ error }))
})

app.post('/api/sauces/:id/like', (req, res, next) => {

})

app.put('/api/sauces/:id', (req, res, next) => {
  Sauce.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
  .then(() => res.status(200).json({ message: 'Object modified !'}))
  .catch(error => res.status(400).json({ error }));
})

app.delete('/api/sauces/:id', (req, res, next) => {
  Sauce.deleteOne({_id: req.params.id})
  .then(() => res.status(200).json({ message: 'Object deleted !'}))
  .catch(error => res.status(400).json({ error }));
})

app.get('/api/sauces', (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
})

app.get('/api/sauces/:id', (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
})

module.exports = app

