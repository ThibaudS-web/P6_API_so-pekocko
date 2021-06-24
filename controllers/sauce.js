const Sauce = require('../models/Sauce')
const fs = require('fs')


exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce)
  const sauce = new Sauce({
    userId: sauceObject.userId,
    name: sauceObject.name,
    manufacturer: sauceObject.manufacturer,
    description: sauceObject.description,
    mainPepper: sauceObject.mainPepper,
    heat: sauceObject.heat,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    // likes: req.body.sauce.likes,
    // dislikes: req.body.sauce.dislikes,
    // usersLikes: req.body.sauce.userLikes,
    // usersDisliked: req.body.sauce.usersDisliked,
  })

  let validForm = new RegExp('^[A-Za-z\é\ë\è\ê\â\ä\à\ù\ü\û\ï\î\ö\ô\ç\\s\-]+$', 'g')
  let testValidForm  = validForm.test(sauceObject.name, sauceObject.manufacturer, sauceObject.description, sauceObject.mainPepper)

  if(testValidForm) {
    sauce.save()
    .then(() => res.status(201).json({ message : "registered object !" }))
    .catch(error => res.status(400).json({ error }))
  } else {
    return res.status(401).json({ message : "Form is invalid !" })
  }
}

exports.rateSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      console.log(req.body.like)
      switch (req.body.like) {
        case -1:
          console.log("-1")
          sauce.dislikes = sauce.dislikes + 1
          console.log(sauce.dislikes)
          sauce.usersDisliked.push(req.body.userId)
          console.log(sauce)
          sauce.save()
          .then(() => res.status(200).json({ message : "You dislike this sauce !"}))
          .catch(error => res.status(400).json({ error }))
          break
        case 0:
          console.log("0")
          if (sauce.usersDisliked.find(user => user === req.body.userId)) {
            sauce.usersDisliked = sauce.usersDisliked.filter(user => user !== req.body.userId)
            sauce.dislikes = sauce.dislikes - 1
            sauce.save()
            .then(() => res.status(200).json({ message : "Dislike deleted !"}))
            .catch(error => res.status(400).json({ error }))
          } else {
            sauce.usersLiked = sauce.usersDisliked.filter(user => user !== req.body.userId)
            sauce.likes = sauce.likes -1
            sauce.save()
            .then(() => res.status(200).json({ message : "Like deleted !"}))
            .catch(error => res.status(400).json({ error }))
          }        
          break
        case 1:
          console.log("1")
          sauce.likes = sauce.likes + 1
          sauce.usersLiked.push(sauce.userId)
          console.log(sauce)
          sauce.save()
          .then(() => res.status(200).json({ message : "You like this sauce !"}))
          .catch(error => res.status(400).json({ error }))
          break
        default:
          res.status(500).json({ error })
      }
    })
    .catch(error => res.status(500).json({ error }))
}

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? 
  { 
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body }

  let validForm = new RegExp('^[A-Za-z\é\ë\è\ê\â\ä\à\ù\ü\û\ï\î\ö\ô\ç\\s\-]+$', 'g')
  let testValidForm  = validForm.test(sauceObject.name, sauceObject.manufacturer, sauceObject.description, sauceObject.mainPepper)

  if(testValidForm){
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Object modified !'}))
    .catch(error => res.status(400).json({ error }));
  } else {
    return res.status(401).json({ message : "Form is invalid !"})
  }
}

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1]
      fs.unlink(`images/${filename}`, () =>{
        Sauce.deleteOne({_id: req.params.id})
          .then(() => res.status(200).json({ message: 'Object deleted !'}))
          .catch(error => res.status(400).json({ error }));
      })
    })
    .catch( error => res.status(500).json({ error }))
}

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({ error }));
}

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}

