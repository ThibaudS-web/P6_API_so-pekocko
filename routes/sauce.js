const express = require('express')
const router = express.Router()

const sauceCtrl = require('../controllers/sauce')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

//all sauce routes secured by authentification middleware,
router.post('/', auth, multer, sauceCtrl.createSauce)
router.post('/:id/like', auth, sauceCtrl.rateSauce) 
router.put('/:id', auth, multer, sauceCtrl.modifySauce)
router.delete('/:id', auth, sauceCtrl.deleteSauce)
router.get('/', auth, sauceCtrl.getAllSauce)
router.get('/:id', auth, sauceCtrl.getOneSauce)

module.exports = router