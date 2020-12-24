
const express = require('express');
const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const { User } = require('./src/Models.js');
const _USERS = require('./users.json');
const { userInfo } = require('os');

//const {bodyParser} = require('body-parser'); //for post requests

const app = express();
const port = 8001; 

app.get('/', (req,res) => res.send('Hello World! from Node.js'))

// app.use(
//     bodyParser.json() //for post requests
// );

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

// console.log('About to bulk create');
// sequelize.sync({force: true})
//     .then(() => {
//         User.bulkCreate(_USERS, {validate: true, individualHooks: true})
//             .then(users => {
//                 console.log('success adding example users');
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }).then(() => {
//         console.log('Bulk Create sync() successful');
//     }).catch(err => {
//         console.error('Bulk Create Sync() failed', err);
//     });
//  console.log('Done with Bulk Create');

sequelize.sync({});
// .then(() => {
//     User.create({
//         UserName: 'joeschmoe',
//         password: 'apassword',
//         FirstName: 'Joe',
//         LastName: "Schmoe",
//         Email: "JoeSchmoe@gmail.com"
//     })
// })

app.put('/createChapter/:Name/', (req, res) => {
    Chapter.create({
        Name: req.params.Name
    })
    .then(user => {
        res.json(user);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})

app.put('/createCouncil/:Name/:ChapterID/', (req, res) => {
    Council.create({
        Name: req.params.Name,
        ChapterID: req.params.ChapterID
    })
    .then(user => {
        res.json(user);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})

//create express route; retrieve all records from Users table
app.get('/findAllUsers', (req, res) => {
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

app.get('/findUserByID/:ID', (req, res) => {
    User.findByPk(req.params.ID)
    .then(user => {
        res.json(user);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
}) 

// app.put('/updateUser', (req, res) => {
//     //User.update(req.body) //normal client request use case
//     User.update({
//         FirstName: 'Schmoe',
//         LastName: 'Joe'
//     },{
//         where: {UserName: 'joeschmoe'}
//     })
//     .then(rows => {
//         res.json(rows);
//     })
//     .catch(error => {
//         console.log(error);
//         res.status(404).send(error);
//     })
// }) 
app.delete('/deleteUserByID/:ID', (req, res) => {
    //User.update(req.body) //normal client request use case
    User.destroy({
        where: {
            ID: req.params.ID,
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
// app.get('/createUser', (req, res) => {
//     User.create({
//         Email: "JoeSchmoe@gmail.com",
//         Password: "password",
//         FirstName: 'Joe',
//         LastName: "Schmoe",
//         NickName: "SchmoJoe",
//         Birthday: new Date('1986', '01', '23'),  
//         Gender: "Male",
//         SecurityQuestion: "Example Question",
//         SecurityAnswer: "Example Answer",
//         ESignatureFilePath: "/a/file/path",
//         SubscribedToNewsLetter: false,
//         SubscribedToPodcast: false,
//         Points: 12,
//         Status: "I am a new user",
//         ProfilePicLarge: "/a/file/path",
//         ProfilePicMedium: "/a/file/path",
//         ProfilePicSmall: "/a/file/path",
//         DateTimeLoggedIn: new Date('2020', '11','28', '01','58','59'),
//         Facebook: "http://afacebooklink.com",
//         Instagram: "@aninstagrampage",
//         Twitter: "@atwitteraccount",
//         ChapterID: 1
//     })
//     .then(user => {
//         res.json(user);
//     })
//     .catch(error => {
//         console.log(error);
//         res.status(404).send(error);
//     })
// })
app.put('/createUser/:Email/:Password/:FirstName/:LastName/:NickName/:Birthday/:Gender/:SecurityQuestion/:SecurityAnswer/:ESignatureFilePath/:SubscribedToNewsLetter/:SubscribedToPodcast/:Points/:ProfilePicLarge/:ProfilePicMedium/:ProfilePicSmall/:Facebook/:Instagram/:Twitter/:ChapterID/', (req, res) => {
    User.create({
        Email: req.params.Email,
        Password: req.params.Password,
        FirstName: req.params.FirstName,
        LastName: req.params.LastName,
        NickName: req.params.NickName,
        Birthday: req.params.Birthday,  
        Gender: req.params.Gender,
        SecurityQuestion: req.params.SecurityQuestion,
        SecurityAnswer: req.params.SecurityAnswer,
        ESignatureFilePath: req.params.ESignatureFilePath,
        SubscribedToNewsLetter: req.params.SubscribedToNewsLetter,
        SubscribedToPodcast: req.params.SubscribedToPodcast,
        Points: req.params.Points,
        Status: req.params.Status,
        ProfilePicLarge: req.params.ProfilePicLarge,
        ProfilePicMedium: req.params.ProfilePicMedium,
        ProfilePicSmall: req.params.ProfilePicSmall,
        DateTimeLoggedIn: new Date(),
        Facebook: req.params.Facebook,
        Instagram: req.params.Instagram,
        Twitter: req.params.Twitter,
        ChapterID: req.params.ChapterID
    })
    .then(user => {
        res.json(user);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})
// npm

app.put('/createUserRole/:RoleID/:UserID/', (req, res) => {
    UserRole.create({
        RoleID: req.params.RoleID,
        UserID: req.params.UserID
    })
    .then(user => {
        res.json(user);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})

app.put('/createCouncilRole/:Name/', (req, res) => {
    CouncilRole.create({
        Name: req.params.Name
    })
    .then(user => {
        res.json(user);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})

app.put('/createCouncilUserRole/:CouncilID/:UserID/:CouncilRoleID/', (req, res) => {
    CouncilUserRole.create({
        CouncilID: req.params.CouncilID,
        UserID: req.params.UserID,
        CouncilRoleID: req.params.CouncilRoleID
    })
    .then(user => {
        res.json(user);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
})


app.listen(port, () => {
    console.log('Running server on port ' + port)
});