var express = require('express');
var app = express();


var session = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// configure view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

var usernames;
//mongo?
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


// utility code
function userExists(toFind) {
  var found = [];
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var query = { username: toFind };
  dbo.collection("users").find(query).toArray(function(err, result) {
    if (err) throw err;
    found = result;
    console.log(result);
    db.close();
  });
});
console.log(found);
if(found.length != 0)
{
  return true;
}
  return false;
}

app.post('/checkUsername', function(request, response) {
  var username = request.body.username;

  if (userExists(username)) {
    // login success
    response.render('enterUsername', {message: 'The username exists already',
                                     title: 'Login Success'});
  } else {
    // Login failed
    response.render('enterUsername', {title: 'Please Log In',
                              message: 'Username Available'});
  }
});
app.post('/', function(request, response) {
  var username = request.body.username;

  if (userExists(username)) {
    // login success
    response.render('enterUsername', {message: 'The username exists already',
                                     title: 'Login Success'});
  } else {
    // Login failed
    response.render('enterUsername', {title: 'Please Log In',
                              message: 'Username Available'});
  }
});

app.get('/', function(request, response) {
  response.render('enterUsername', {title: 'Lab 09', message: 'Please enter a username to check.'});
});

app.get('/checkUsername', function(request, response) {
  response.render('enterUsername', {title: 'Lab 09', message: 'Please enter a username to check.'});
});
app.get('/help', function(request, response) {
  response.render('enterUsername', {title: 'Lab 09', message: 'Please enter a username to check.'});
});

app.listen(3001, function() {
  console.log('Listening on port 3001');
});
