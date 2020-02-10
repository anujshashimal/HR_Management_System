const express = require("express");
const app = express();
const port = 3000;
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const mongo =  require('mongodb')
const expressHandlebars = require('express-handlebars')
const router = express.Router()

require('./db/mongose')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('hbs', expressHandlebars)

 app.get('/', (req, res) => 
 {
     res.sendFile(__dirname + '/views/index.html')
 })

 app.use('/login', (req, res) => {

    res.sendFile(__dirname + '/views/login.html')

})

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

const nameSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    pwd: String
   });

const User = mongoose.model('User', nameSchema);


app.post('/home', (req, res) => {
    const userDet = new User(
    {
         fname: req.body.fname,
         lname: req.body.lname,
         email: req.body.email,
         pwd: req.body.pwd
       });
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
});


//get oarticular user details

router.get('/list', (req, res) => {
    User.find((err, docs) => {
        if(!err) {
            res.render('list', {data : docs})
        }
    })
    res.send('Users Controller')
})

app.use('/users', User)








 

