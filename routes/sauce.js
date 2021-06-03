const express = require('express')
const router = express.Router()

const sauceCtrl = require('../controllers/sauce')

router.post('/', sauceCtrl.createSauce)
router.post('/:id/like', (req, res, next) => {
  
})
router.put('/:id', sauceCtrl.modifySauce)
router.delete('/:id', sauceCtrl.deleteSauce)
router.get('/', sauceCtrl.getAllSauce)
router.get('/:id', sauceCtrl.getOneSauce)

module.exports = router