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

    socket.on('message', (data) => {
        io.emit('message', { user: socket.id, message: data })
    })
})

app.use('/api', router)

require('./db')

server.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})