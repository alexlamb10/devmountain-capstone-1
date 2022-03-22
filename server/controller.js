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
        drop table if exists trip;
        drop table if exists users;

            create table users (
                user_id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                username VARCHAR(255),
                password TEXT
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
                user_id INT REFERENCES users(user_id)
                
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
        sequelize.query(`
            INSERT INTO users (name, username, password)
                VALUES ('${newUser}', '${username}', '${passwordHash}');

        `)
        //Push message to front end stating account was created
        res.status(200).send(`Account creation comlete! Please sign in.`)
    },
    
    logInUser: (req, res) => {

        //Get username and password from front end
        let {password: passwordFromUser} = req.body
        let user = req.params.username
        
        //Get password from back end that matches username entered
        sequelize.query(`SELECT password, user_id FROM users WHERE username = '${user}';`)
        .then(dbRes => {                
                const passwordHash = dbRes[0][0].password
                //Compare password to hash
                bcryptjs.compare(passwordFromUser, passwordHash, function(err, isMatch){
                    if (err){
                        throw err
                    } else if(!isMatch) {
                        res.sendStatus(400)
                    } else {
                        //Send message and user_id to store on front end
                        res.status(200).send({message: `Welcome ` + user,
                                                userId: dbRes[0][0].user_id})
                    }
                })
            })

            

        
        
    }
}