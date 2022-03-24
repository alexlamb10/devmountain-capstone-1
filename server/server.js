const express = require('express')
const cors = require('cors')
require('dotenv').config()
const{SERVER_PORT} = process.env


const app = express()

let {createLogIn, logInUser, seed, createTrip, returnPlannedTrips, markComplete, returnCompletedTrips} = require('./controller')

app.use(express.json())
app.use(cors())

let port = 4400


//Seed database
app.post('/seed', seed)

//create a user log in and send to database
app.post('/users', createLogIn)

//let user log in by comparing password to password hash
// look up how to catch the error from the login function, and then return a server error (500)
app.post('/users/:username', logInUser)


//Create trip, send trip info to back end
app.post('/trips', createTrip)

//return planned trips to wishlist.js
app.get('/trips/:trip', returnPlannedTrips)

//mark a trip as complete on the wishlist page
app.put('/updateTrips', markComplete)


//return completed trips to traveled-list.js
app.get('/completedTrips/:trip', returnCompletedTrips)

app.listen(port, () => {
    console.log(`server is listening on port ${SERVER_PORT}`)
})