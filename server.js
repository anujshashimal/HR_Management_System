const express = require("express");
const app = express();
const port = 3000;
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const mongo =  require('mongodb')
const expressHandlebars = require('express-handlebars')
const router = express.Router()
require('./db/mongose')
const Userss = require('./model/user')
const UserLe = require('./model/userleave')
// const session = require('express-session')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname + '/views/'))

app.engine('hbs', expressHandlebars({
extname : 'hbs',
defaultLayout : 'mainLayout',
layoutsDir: __dirname + '/views/hbs'

}))

app.set('view engine',  'hbs')

 app.get('/emailandpass', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
})

app.get('', (req, res) => 
{
    res.render('list', {})
})

app.use('/reg', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.listen(port, () => {
    console.log("Server listening on port " + port);
});


// const User = mongoose.model('User', nameSchema);

app.post('/applyuser', (req, res) => {
   const UserLev = new UserLe(req.body)
    UserLev.save()
      .then(item => {
        res.status(400).send("Successfully saved!");
    })
      .catch(err => {
          res.status(400).send("Unable to save to database");
      });
   });

   app.use('/applyuser', (req, res) => {
    res.sendFile(__dirname + '/views/ApplyUser.html')
})

   
app.post('/home', (req, res) => {
    const userDet = new Userss(req.body)
      userDet.save()
      .then(item => {
        res.sendFile(__dirname + '/views/login.html')
    })
      .catch(err => {
          res.status(400).send("Unable to save to database");
      });
   });



   app.post('/redhome', function(req, res) {
    if(req.body.specName == 'anuj' && req.body.specPass == '123') {

            res.sendFile(__dirname + '/views/home.html')
            return;
    }else{
        res.status(400).send("Please Insert Correct Username and Password!");
    }
}
);

app.get('/listnm', (req, res) => {
    User.find((err, docs) => {
        if(!err){ 
            console.log(docs)
            res.send('User controller')
            res.render('list', {data : docs})
        }else{

            res.send('Error')
        }
    })
})




//get particular user details
// app.get('/', (req, res) => {
//     User.find((err, docs) => {
//         if(!err) {
//             console.log(docs)
//             console.log(res.body)
//             res.render('list', {data : docs})
//         }
//     })
//     res.send('Users Controller')
// })

//handle sessions

// app.use(session({
//     resave: true,
//     saveUninitialized: false
//   }));








 

