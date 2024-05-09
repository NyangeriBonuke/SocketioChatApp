const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authController')
const verifyToken = require('../middlewares/authToken')

router.post('/login', AuthController.login)
router.post('/signup', AuthController.signup)
router.get('/users', AuthController.getUsers)

module.exports = router