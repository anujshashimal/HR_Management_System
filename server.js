const express = require("express");
const app = express();
const port = 3000;
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('./db/mongose')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

 app.get('/', (req, res) => {
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

   app.post("/login", function(req, res) {
    if(req.body.specName && req.body.specPass) {
        if(authenticated) {
            var token = generateAndStoreRandomString(req.body.username);
            res.redirect("http://your.domain/path?token=" + token);
            return;
        }
        // Do something if username or password wrong
    }
    // Do something if no username or password
});

 

