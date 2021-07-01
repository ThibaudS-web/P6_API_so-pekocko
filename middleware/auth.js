const jwt = require('jsonwebtoken')


//Middleware to require user authentication
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, `${process.env.TOKENPASS}`)
        const userId = decodedToken.userId
        if(req.body.userId && req.body.userId !== userId){
            throw 'User ID not valid !'
        } else {
            if (typeof localStorage === "undefined" || localStorage === null) {
                var LocalStorage = require('node-localstorage').LocalStorage;
                localStorage = new LocalStorage('./scratch');
              }
              localStorage.setItem('tokenUser', token)
            next()
        }
    } catch ( error ) {
        res.status(401).json({ error: error | 'Request unauthenticated !'})
    }
}

