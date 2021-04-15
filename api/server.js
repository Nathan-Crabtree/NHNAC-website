
const express = require('express');
const { Sequelize, DataTypes, Model, Op } = require('sequelize');
//const { User } = require('./src/Models.js');
const Models = require('./src/Models.js');
const _USERS = require('./users.json');
const { userInfo } = require('os');
const { Certificate } = require('crypto'); 
var cors = require('cors'); //prevents fetch() being blocked by CORS policy 


//const {bodyParser} = require('body-parser'); //for post requests

const app = express();
app.use(cors());
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

//sequelize.sync({force: true}); //doesn't actually drop tables??
Models.Address.destroy({truncate: {}});
Models.User.destroy({truncate: {}});

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

//sequelize.sync({});
sequelize.sync({force: true});

// .then(() => {
//     User.create({
//         UserName: 'joeschmoe',
//         password: 'apassword',
//         FirstName: 'Joe',
//         LastName: "Schmoe",
//         Email: "JoeSchmoe@gmail.com"
//     })
// })

//app.post('/createChapter/:Name/', (req, res) => {
app.post('/createChapter:Name/', (req, res) => {
   Models.Chapter.create({
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

app.post('/createCouncil/:Name/:ChapterID/', (req, res) => {
    Models.Council.create({
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
    Models.User.findAll({
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
    Models.User.findByPk(req.params.ID)
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
    Models.User.destroy({
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
//app.post('/createUser/:Email/:Password/:FirstName/:LastName/:NickName/:Birthday/:Gender/:SecurityQuestion/:SecurityAnswer/:ESignatureFilePath/:SubscribedToNewsLetter/:SubscribedToPodcast/:Points/:ProfilePicLarge/:ProfilePicMedium/:ProfilePicSmall/:Facebook/:Instagram/:Twitter/:ChapterID/', (req, res) => {
// app.post('/createUser:Email:Password:FirstName:LastName:NickName:Birthday:Gender:SecurityQuestion:SecurityAnswer:ESignatureFilePath:SubscribedToNewsLetter:SubscribedToPodcast:Points:ProfilePicLarge:ProfilePicMedium:ProfilePicSmall:Facebook:Instagram:Twitter:ChapterID/', (req, res) => {
//     console.log("Inside Create USER API");
//     Models.User.create({
//         Email: req.params.Email,
//         Password: req.params.Password,
//         FirstName: req.params.FirstName,   
//         LastName: req.params.LastName,
//         NickName: req.params.NickName,
//         Birthday: req.params.Birthday,  
//         Gender: req.params.Gender,
//         SecurityQuestion: req.params.SecurityQuestion,
//         SecurityAnswer: req.params.SecurityAnswer,
//         ESignatureFilePath: req.params.ESignatureFilePath,
//         SubscribedToNewsLetter: req.params.SubscribedToNewsLetter,
//         SubscribedToPodcast: req.params.SubscribedToPodcast,
//         Points: req.params.Points,
//         Status: req.params.Status,
//         ProfilePicLarge: req.params.ProfilePicLarge,
//         ProfilePicMedium: req.params.ProfilePicMedium,
//         ProfilePicSmall: req.params.ProfilePicSmall,
//         DateTimeLoggedIn: new Date(),
//         Facebook: req.params.Facebook,
//         Instagram: req.params.Instagram,
//         Twitter: req.params.Twitter,
//         ChapterID: req.params.ChapterID
//     })
    // .then(user => {
    //     console.log("Finished Create USER API");
    //     res.json(user);
    // })
    // .catch(error => {
    //     console.log("ERROR Create USER API");

    //     console.log(error);
    //     res.status(404).send(error);
    // })
// })
// npm
app.post('/createChapter:Name/', (req, res) => {
    Models.Chapter.create({
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

  app.post('/createUser/:AddressID/:Email/:Password/:FirstName/:LastName/:Birthday/:Gender/:SecurityQuestion/:SecurityAnswer', (req, res) => {
     console.log("Inside Create USER API");
     Models.User.create({
         //ChapterID: req.params.ChapterID, //not needed yet
         AddressID: req.params.AddressID,
         Email: req.params.Email,
         Password: req.params.Password,
         FirstName: req.params.FirstName,
         LastName: req.params.LastName,
//         NickName: req.params.NickName,
         Birthday: req.params.Birthday,  
         Gender: req.params.Gender,
         SecurityQuestion: req.params.SecurityQuestion,
         SecurityAnswer: req.params.SecurityAnswer
//         ESignatureFilePath: req.params.ESignatureFilePath,
//         SubscribedToNewsLetter: req.params.SubscribedToNewsLetter,
//         SubscribedToPodcast: req.params.SubscribedToPodcast,
//         Points: req.params.Points,
//         Status: req.params.Status,
//         ProfilePicLarge: req.params.ProfilePicLarge,
//         ProfilePicMedium: req.params.ProfilePicMedium,
//         ProfilePicSmall: req.params.ProfilePicSmall,
//         DateTimeLoggedIn: new Date(),
//         Facebook: req.params.Facebook,
//         Instagram: req.params.Instagram,
//         Twitter: req.params.Twitter,
//         ChapterID: req.params.ChapterID

     })     
     .then(user => {
        res.json(user);
    })
    .catch(error => {
        console.log(error);
        res.status(404).send(error);
    })
});

app.post('/createAddress/:Street/:Country/:State/:City/:Zip/', (req, res) => {
    Models.Address.create({
        Street: req.params.Street,
        Country: req.params.Country,
        State: req.params.State,
        City: req.params.City,
        Zip: req.params.Zip
    })     
    .then(address => {
       res.json(address);
   })
   .catch(error => {
       console.log(error);
       res.status(404).send(error);
   })
});
app.put('/updateUser/:Email/:Password/:FirstName/:LastName/:NickName/:Birthday/:Gender/:SecurityQuestion/:SecurityAnswer/:ESignatureFilePath/:SubscribedToNewsLetter/:SubscribedToPodcast/:Points/:ProfilePicLarge/:ProfilePicMedium/:ProfilePicSmall/:Facebook/:Instagram/:Twitter/:ChapterID/', (req, res) => {
    console.log("Inside UPDATE USER API");
    Models.User.update({
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
        console.log("Finished update USER API");
        res.json(user);
    })
    .catch(error => {
        console.log("ERROR update USER API");

        console.log(error);
        res.status(404).send(error);
    })
})

app.post('/createUserRole/:RoleID/:UserID/', (req, res) => {
    Models.UserRole.create({
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

app.post('/createCouncilRole/:Name/', (req, res) => {
    Models.CouncilRole.create({
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

app.post('/createCouncilUserRole/:CouncilID/:UserID/:CouncilRoleID/', (req, res) => {
    Models.CouncilUserRole.create({
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

app.post('/createAddress/:Address/:Country/:State/:City/:Zip/:UserID/', (req, res) => {
    Models.Address.create({
        Address: req.params.Address,
        Country: req.params.Country,
        State: req.params.State,
        City: req.params.City,
        Zip: req.params.Zip,
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

app.post('/createCertificate/:CertificationID/:UserID/:UserCertFilePath/:Started/:Completed/:Date/:Time/', (req, res) => {
    Certificate.create({
        CertificationID: req.params.CertificationID,
        UserID: req.params.UserID,
        UserCertFilePath: req.params.UserCertFilePath,
        Started: req.params.Started,
        Completed: req.params.Completed,
        Date: req.params.Date,
        Time: req.params.Time
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
    console.log('Running CORS-enabled server on port ' + port)
});