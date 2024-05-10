const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const router = require('./routes/route')
require('dotenv').config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
})

app.use(cors())
app.use(express.json())

io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('joinRoom', (userId) => {
        socket.join(userId)
        console.log(`User ${userId} joined the room`)
    })

    socket.on('message', (data) => {
        io.to(data.receiverId).emit('message', { user: data.senderId, message: data.message })
    })
})

app.use('/api', router)

require('./db')

server.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})