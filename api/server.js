const express = require('express');
const { Sequelize, DataTypes, Model } = require('sequelize');

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


app.listen(port, () => {
    console.log('Running server on port ' + port)
});

//const Models = require('./src/Models.js')
require('./src/Models.js')

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

sequelize.sync({ 
    force: true,
    logging: console.log
})

//This worked at first, but I tried adding the above code and it started failing
// .then(() => {
//     User.create({
//         FirstName: 'Joe',
//         LastName: "Schmoe",
//         Email: "JoeSchmoe@gmail.com"
//     })
// })