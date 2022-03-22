const express = require('express')
const cors = require('cors')
require('dotenv').config()
const{SERVER_PORT} = process.env


const app = express()

let {createLogIn, logInUser, seed} = require('./controller')

app.use(express.json())
app.use(cors())

let port = 4400


//Seed database
app.post('/seed', seed)

//create a user log in and send to database
app.post('/users', createLogIn)

//let user log in by comparing password to password hash
app.post('/users/:username', logInUser)

app.listen(port, () => {
    console.log(`server is listening on port ${SERVER_PORT}`)
})