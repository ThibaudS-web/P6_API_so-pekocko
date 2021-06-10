const Sauce = require('../models/Sauce')

exports.createSauce = (req, res, next) => {  
  const sauce = new Sauce({
    userId: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    mainPepper: req.body.mainPepper,
    imageUrl: req.body.imageUrl,
    heat: req.body.heat,
    likes: req.body.likes,
    dislikes: req.body.dislikes,
    userLikes: req.body.userLikes,
    usersDisliked: req.body.usersDisliked,
  })
  sauce.save()
    .then(() => res.status(201).json({ message : "registered object !" }))
    .catch(error => res.status(400).json({ error }))
}

exports.modifySauce = (req, res, next) => {
  Sauce.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Object modified !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({ message: 'Object deleted !'}))
    .catch(error => res.status(400).json({ error }));
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

