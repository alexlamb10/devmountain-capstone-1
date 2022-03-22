require('dotenv').config()
const bcryptjs = require('bcryptjs')
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    } 
})

let users = []

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        drop table if exists authentication;
        drop table if exists trip;
        drop table if exists users;

            create table users (
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(255)
            );
            
            create table authentication (
                auth_id SERIAL PRIMARY KEY,
                passowrd TEXT,
                user_id INT,
                FOREIGN KEY (user_id) REFERENCES users(user_id)
            );

            create table trip (
                trip_id SERIAL PRIMARY KEY,
                city VARCHAR(255),
                state VARCHAR(255),
                country VARCHAR(255),
                num_of_days INT,
                time_of_year VARCHAR(20),
                activities TEXT,
                est_cost INT,
                completed BOOLEAN,
                start_date DATE,
                end_date DATE,
                user_id INT,
                FOREIGN KEY (user_id) REFERENCES users(user_id)
            );
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },
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
    
    logInUser: (req, res) => {
        const salt = bcryptjs.genSaltSync(5)
        const passwordHash = bcryptjs.hashSync('123', salt)

        let {password: passwordFromUser} = req.body
        let user = req.params.username

        bcryptjs.compare(passwordFromUser, passwordHash, function(err, isMatch){
            if (err){
                throw err
            } else if(!isMatch) {
                res.sendStatus(400)
            } else {
                res.status(200).send(`Welcome ` + user)
            }
        })
        
        
    }
}