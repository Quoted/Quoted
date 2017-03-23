var express = require('express');
var bodyParser = require('body-parser');
var handler = require('./request-handler');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var s3Router = require('./s3Router');
var loadExampleData = require('./loadExampleData').loadExampleData;
var User = require('../database-mongo/models/user.js');
loadExampleData();


var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser('Greenfie1dBr0s'));
app.use(session({
  secret: 'Greenfie1dBr0s',
  resave: false,
  saveUninitialized: true
}));

//router for S3
app.use('/s3', s3Router({
  bucket: 'hrsf72-quoted-app',
  ACL: 'public-read'
}))


// app.get('/user', function(req, res){ 
//   var sessionCheck = req.session ? !!req.session.username : false;
//   if (sessionCheck) {
//     res.json(req.session.user);
//   } else {
//     res.json(null);
//   }
// });

// app.post('/user', function(req, res){
//   console.log('req ', req);
//   var sessionCheck = req.session ? !!req.session.username : false;
//   if (sessionCheck) {
//     console.log('i\'m getting destroyed');
//     req.session.destroy(function(){
//       res.end();
//     }); 
//   } else {
//     console.log('failed');
//     res.end();
//   }
// });

app.post('/login', function (req, res) {
 var username = req.body.username;
 var password = req.body.password;

 User.findOne({
   username: username,
 }, function(err, data) {
  User.comparePassword(password, data.password, function (firstarg, secondArgs) {
    if(secondArgs) {
      console.log('COREECT password')
      // res.redirect('/?#/');
      // res.send(200).l
    } else {
      console.log('wrong password')
      // res.redirect('/?#/login')
      
    }
  })
 });

 // res.end()
});


app.post('/signup', function (req, res) {
 var name1 = req.body.name;
 var username = req.body.username;
 var email = req.body.userEmail;
 var password = req.body.password;


 User.create({
   name: name1,
   username: username,
   userEmail: email,
   password: password
 }, function(err, data) {
   console.log('saved login');
   res.status(300).send();
 });

 res.end()
});



app.post('/user/signup', handler.userSignUp);
app.post('/user/login', handler.userLogin);
app.get('/user/logout', handler.userLogout);
// app.post('/businesses', handler.loadBusinessData, handler.queryYelp, handler.loadBusinessData);
app.post('/businesses', handler.checkBusinessData);
app.get('/businesses', handler.checkBusinessData); 


app.post('/messages', handler.textBusinesses);
app.post('/call', handler.callBusinesses)  
app.post('/voice', handler.setVoiceMessage);

//Deployment ports
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log('listening on on port:' + app.get('port'));
});

