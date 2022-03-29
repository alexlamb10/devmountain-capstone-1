const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const{SERVER_PORT} = process.env
const {AWS_ACCESS_KEY_PUBLIC, AWS_ACCESS_KEY_PRIVATE, AWS_REGION, S3_BUCKET} = process.env

const AWS = require('aws-sdk')
// const S3 = require('aws-sdk/clients/s3')

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_PUBLIC,
    secretAccessKey: AWS_ACCESS_KEY_PRIVATE,
    region: AWS_REGION
})
const S3 = new AWS.S3()

const app = express()

let {createLogIn, logInUser, seed, createTrip, returnPlannedTrips, markComplete, returnCompletedTrips, deleteTrip, filterTrips, addPicture} = require('./controller')

app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, "../public")))


app.post('/api/s3', (req, res) => {
    const photo = req.body

    const buf = new Buffer(photo.file.replace(/^data:image\/\w+;base64,/, ''), 'base64')

    const params = {
        Bucket: S3_BUCKET,
        Body: buf,
        Key: photo.fileName,
        ContentType: photo.fileType,
        ACL: 'public-read'
    }

    S3.upload(params, (err, data) => {
        console.log(222222, err)
        let response, code;
        if(err) {
            response = err;
            code = 500
        }else {
            response = data;
            code = 200
        }
        res.status(code).send(response)
    })
})

app.put('/tripPic', addPicture)

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

//delete trips
app.delete('/deleteTrip', deleteTrip)


app.get('/filteredTrips/', filterTrips)

app.listen(SERVER_PORT, () => {
    console.log(`server is listening on port ${SERVER_PORT}`)
})