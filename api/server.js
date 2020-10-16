
const express = require('express');
const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const { User } = require('./src/Models.js');
const _USERS = require('./users.json');
const { userInfo } = require('os');

const app = express();
const port = 8001; 


const sequelize = new Sequelize('newhaven', 'newhavenuser', 'newhavenpass',{
    host: 'localhost',
    dialect: 'mysql',
    //storage: 'newhaven.mysql' // not sure if this is necessary; I already created the "newhaven" database 
    operatorsAliases: false // prevents us from receiving certain deprecation warnings inside console
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to database successfull');
    })
    .catch(err => {
        console.error('Unable to connect to the database', err);
    });


User.destroy({truncate: {}});

console.log('About to bulk create');
sequelize.sync({force: true})
    .then(() => {
        User.bulkCreate(_USERS, {validate: true, individualHooks: true})
            .then(users => {
                console.log('success adding example users');
            })
            .catch(error => {
                console.log(error);
            })
    }).then(() => {
        console.log('Bulk Create sync() successful');
    }).catch(err => {
        console.error('Bulk Create Sync() failed', err);
    });
 console.log('Done with Bulk Create');

sequelize.sync({})
.then(() => {
    User.create({
        UserName: 'joeschmoe',
        password: 'apassword',
        FirstName: 'Joe',
        LastName: "Schmoe",
        Email: "JoeSchmoe@gmail.com"
    })
})

//create express route; retrieve all records from Users table
app.get('/findAll', (req, res) => {
    User.findAll({
        //find records with specific userName
        // where: {
        //     UserName: 'joeschmoe'     
        // }
        
        //find all records where firstName contains an s (case insensitive)
        where: {
            FirstName: {
                [Op.like]: '%s%'  
            }
        }
    })
    .then(user => {
        res.json(user);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
}) 

app.get('/findByPk', (req, res) => {
    User.findByPk('joeschmoe')
    .then(user => {
        res.json(user);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
}) 

app.put('/update', (req, res) => {
    //User.update(req.body) //normal client request use case
    User.update({
        FirstName: 'Schmoe',
        LastName: 'Joe'
    },{
        where: {UserName: 'joeschmoe'}
    })
    .then(rows => {
        res.json(rows);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
}) 
app.delete('/delete', (req, res) => {
    //User.update(req.body) //normal client request use case
    User.destroy({
        where: {
            UserName: 'joeschmoe',
         }
    })
    .then(() => {
        res.send('user successfully deleted');
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
}) 
// app.get('/', (req, res) => {
//     User.create({
//         FirstName: 'Joe',
//         LastName: "Schmoe",
//         Email: "JoeSchmoe@.com"
//     })
//     .then(user => {
//         res.json(user);
//     })
//     .catch(error => {
//         console.log(error);
//         res.status(404).send(error);
//     })
// })


//examnple post method; doesn't work here
// app.post('/post', (req, res) => {
//     const newUser = req.body.user;
//     //User.create(newUser) //this works just fine
//     User.create({  //this also works
//         UserName: newUser.UserName,
//         FirstName: newUser.FirstName,
//         LastName: newUser.LastName,
//         Email: newUser.Email,
//         Password: newUser.Password
//     })
// })

app.listen(port, () => {
    console.log('Running server on port ' + port)
});