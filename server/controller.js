const bcryptjs = require('bcryptjs')

let users = []

module.exports = {
    createLogIn: (req, res) => {
        let {newUser, username, password} = req.body
        //Generate passwordHash
        const salt = bcryptjs.genSaltSync(5)
        const passwordHash = bcryptjs.hashSync(password, salt)

        let newBody = {
            newUser,
            username,
            passwordHash
        }
        //push new user to users array
        users.push(newBody)
        res.status(200).send(`Account creation comlete! Please sign in.`)
    },
    // logInUser: (req, res) => {

    // }
}