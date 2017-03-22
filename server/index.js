var express = require('express');
var bodyParser = require('body-parser');
var handler = require('./request-handler');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var s3Router = require('./s3Router');

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

