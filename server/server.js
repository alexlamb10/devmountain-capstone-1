const express = require('express')
const cors = require('cors')
require('dotenv').config()
const{SERVER_PORT} = process.env


const app = express()

let {createLogIn, logInUser, seed} = require('./controller')

app.use(express.json())
app.use(cors())

let port = 4400

app.post('/seed', seed)

app.post('/users', createLogIn)

app.post('/users/:username', logInUser)

app.listen(port, () => {
    console.log(`server is listening on port ${SERVER_PORT}`)
})