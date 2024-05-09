const User = require('../models/userModel')
const bcrypt = require('bcrypt')

class AuthUseCase{
    async createUSer(userData){
        try{
            const user = new User(userData)
            const savedUser = await user.save()
            return savedUser
        }
        catch(error){
            throw new Error(`Usecase create user error: ${error}`)
        }
    }

    async loginUser({email, password}){
        try{
            const user = await User.findOne({email})
            if(!user){
                throw new Error('Wrong credentials')
            }
            const validPassword = await bcrypt.compare(password, user.password)
            if(!validPassword){
                throw new Error('Wrong Credentials')
            }
            return user
        }
        catch(error){
            throw new Error(`Usecase login user error: ${error}`)
        }
    }

    async allUsers(){
        try{
            const allUsers = await User.find()
            return allUsers
        }
        catch(error){
            throw new Error(`Usecase get all users error ${error}`)
        }
    }
}

module.exports = new AuthUseCase