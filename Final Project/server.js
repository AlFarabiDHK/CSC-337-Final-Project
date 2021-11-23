// importing modules
const mongoose = require('mongoose');
const express = require('express');
const parser = require('body-parser')
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const app = express();

// authenticate and login functions

TIMEOUT = 50000;
var sessions = {};

function filterSessions() {
  let now = Date.now();
  for (e in sessions) {
    if (sessions[e].time < (now - TIMEOUT)) {
      delete sessions[e];
    }
  }
}

setInterval(filterSessions, 2000);

function putSession(username, sessionKey) {
  if (username in sessions) {
    sessions[username] = {'key': sessionKey, 'time': Date.now()};
    return sessionKey;
  } else {
    let sessionKey = Math.floor(Math.random() * 1000);
    sessions[username] = {'key': sessionKey, 'time': Date.now()};
    return sessionKey;
  }
}

function isValidSession(username, sessionKey) {
  if (username in sessions && sessions[username].key == sessionKey) {
    return true;
  }
  return false;
}
function authenticate(req, res, next) {
    if (Object.keys(req.cookies).length > 0) {
      let u = req.cookies.login.username;
      let key = req.cookies.login.key;
      if (isValidSession(u, key)) {
        putSession(u, key);
        res.cookie("login", {username: u, key:key}, {maxAge: TIMEOUT});
        next();
      } else {
        res.redirect('/index.html');
      }
    } else {
      res.redirect('/index.html');
    }
  }

// all app.use calls go here

app.use(parser.text({type: '*/*'}));
app.use(cookieParser());
app.use('/',express.static('public_html'));
app.use('/login',authenticate);

// Create the schema (in other words, the database object structure specification)
var Schema = mongoose.Schema;
var FreelancerSchema = new Schema({
  username: String, 
  password: String, 
  name: String,
  bio: String,
  service: [{type: mongoose.Types.ObjectId, ref: 'Service'}],
  contact: String,
});

var Freelancer = mongoose.model('Freelancer', FreelancerSchema)

var ServiceSchema = new Schema({
  name: String, 
  description: String, 
  price: Number,
  class: String,
  image: String
 });
var Service = mongoose.model('Service', ServiceSchema );


// mongodb code

const db  = mongoose.connection;
const mongoDBURL = 'mongodb://127.0.0.1/';
mongoose.connect(mongoDBURL, { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// all get requests
app.get('/', (req, res) => { res.redirect('/index.html'); });
app.get('/testcookies', (req, res)=>{res.send(req.cookies);});

// Start the server!

app.listen(80, () => { console.log('server has started'); });
