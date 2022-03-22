const express = require('express')
const cors = require('cors')


const app = express()

let {createLogIn, logInUser} = require('./controller')

app.use(express.json())
app.use(cors())

let port = 4400

app.post('/users', createLogIn)



app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})