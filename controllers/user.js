//import bcrypt for hashing password in database 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Import user model
const User = require('../models/User')

//Crypt mail
function UnCryptMail(sentence) {
    var n = 0;
    var r = "";
    for( var i = 0; i < sentence.length; i++)
    {
        n = sentence.charCodeAt( i );
        if( n >= 8364 )
        {
            n = 128;
        }
        r += String.fromCharCode( n - 1 );
    }
    return r;
}

//Controller for the POST sign up 
exports.signup = (req, res, next) => {
    if(req.body.password == undefined || req.body.email == undefined) {
        res.status(400).json({ message: 'required fields : password, email' })
        return
    }
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: UnCryptMail(req.body.email),
            password: hash
        })
        user.save()
        .then(() => res.status(201).json({ message: 'User created !'}))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

//Controller for the POST login
exports.login = (req, res, next) => {
    User.findOne({ email: UnCryptMail(req.body.email)} )
        .then(user => {
            if(!user) {
                return res.status(401).json({ message:'User not found !'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ message:'Wrong password !'})
                    }
                    const tokenUser = {
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            `${process.env.TOKENPASS}`,
                            { expiresIn: '24h'}                            
                        )
                    }              
                    res.status(200).json(tokenUser)               
                })              
        })
        .catch(error => res.status(500).json({ error }))
}




