const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).json({message: 'Access denied'})
    }

    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = decoded
        next()
    }
    catch(error){
        res.status(400).json({message: 'Invalid token'})
    }
}

module.exports = verifyToken