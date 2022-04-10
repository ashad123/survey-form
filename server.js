//jshint esversion:6

const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
const bodyParser = require('body-parser');

const app = express();

require('dotenv').config()

app.use(express.static('public'))

app.use(bodyParser.urlencoded({
    extended: false
 }));
 
 app.use(bodyParser.json());
 


app.get('/', function(req, res) {

    res.sendFile(__dirname + '/index.html');
});


app.post('/', function(req, res) {
   
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let mobileno = req.body.mobileno;
    let DateofBirth = req.body.DateofBirth;
    let combinedincome = req.body.combinedincome;
    let cityname = req.body.cityname;
    let statename = req.body.statename;
    let zipcode = req.body.zipcode;
    let message = req.body.message;

    // res.send("Email was Send Successfully");
    // console.log(firstname);

    const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: 'OAuth2',
            user: process.env.AUTH_EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            accessToken: process.env.ACCESS_TOKEN
        }

    });

    let mailDetails = {
        from: email,
        to: 'ashadusmani6@gmail.com',
        subject: 'survey-form add as new contact',
        html: `<h4>Firstname: ${firstname}<br/>
               Lastname: ${lastname}<br/>
               Email: ${email}<br/>
               Mobileno: ${mobileno}<br/>
               DateofBirth: ${DateofBirth}<br/>
               Combinedincome: ${combinedincome}<br/>
               City-Name: ${cityname}<br/>
               State-Name: ${statename}<br/>
               Zip-Code: ${zipcode}<br/>
               Message: ${message}<br/>
               </h4>`
    } 

    mailTransporter.sendMail(mailDetails, function(err, result){
        if(err){
            console.log(err);
            res.send('error');
        }else{
            console.log("Email sent:" + result.response);
            res.send("Email was send!");
        }
    });

});

let port = process.env.PORT;
if(port == null || port == "") {
    port = 3000;
}
app.listen(port, function() {
 console.log('Server is running at port ', port);

});