const AuthUseCase = require('../usecases/authUseCase')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class AuthController{
    async signup(req, res){
        try{
            const {name, email, password} = req.body
            if(!name || !email || !password){
                return res.status(500).json('Wrong credentials')
            }
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const user = await AuthUseCase.createUSer({name, email, password: hashedPassword})
            const tokenSecret = process.env.TOKEN_SECRET + user._id
            const token = jwt.sign({id: user._id}, tokenSecret)
            res.header('auth-token', token).json({ "token": token, "id": user._id, "name": user.name })
        }
        catch(error){
            res.status(500).json(`Sign Controller error: ${error}`)
        }
    }

    async login(req, res){
        try{
            const {email, password} = req.body
            if(!email || !password){
                return res.status(400).json('Wrong credentials')
            }
            const user = await AuthUseCase.loginUser({email, password})
            const tokenSecret = process.env.TOKEN_SECRET + user._id
            const token = jwt.sign({id: user._id}, tokenSecret)
            res.header('auth-token', token).json({ "token": token, "id": user._id, "name": user.name })
        }
        catch(error){
            res.status(500).json(`Login controller error: ${error}`)
        }
    }
}

module.exports = new AuthController