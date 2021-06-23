const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.signup = (req, res, next) => {
    if(req.body.password == undefined || req.body.email == undefined) {
        res.status(400).json({ message: 'required fields : password, email' })
        return
    }
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(() => res.status(201).json({ message: 'User created !'}))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email} )
        .then(user => {
            if(!user) {
                return res.status(401).json({ message:'User not found !'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ message:'Wrong password !'})
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'akdiektp458dkjqspsd2klsqdmolsd_df54fdsfl_dsflml',
                            { expiresIn: '24h'}
                        )
                    })
                })
        })
        .catch(error => res.status(500).json({ error }))
}