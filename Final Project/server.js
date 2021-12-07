// importing modules
const mongoose = require('mongoose');
const express = require('express');
const parser = require('body-parser')
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ storage: storage });
var fs = require('fs');
var path = require('path');

const app = express();
app.set("view engine","ejs");
app.use(cookieParser());
// authenticate and login functions

TIMEOUT = 500000;
var sessions = {};
function filterSessions() {
  let now = Date.now();
  for (e in sessions) {
    if (sessions[e].time < (now - TIMEOUT)) {
      console.log("logged out");
      delete sessions[e];
    }
  }
}

function loggedOut(username){
  delete sessions[username];
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
        res.redirect('index.html');
      }
    } else {
      res.redirect('index.html');
    }
  }
  app.use('/welcome.html',authenticate);
  /** HASHING CODE **/

function getHash(password, salt) {
  var cryptoHash = crypto.createHash('sha512');
  var toHash = password + salt;
  var hash = cryptoHash.update(toHash, 'utf-8').digest('hex');
  return hash;

}

function isPasswordCorrect(account, password) {
  var hash = getHash(password, account.salt);
  return account.hash == hash;
}

/** END HASHING CODE **/

// all app.use calls go here

app.use(parser.text({type: '*/*'}));

app.use('/',express.static('public_html'));

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.use(parser.json({limit:'50mb'})); 
app.use(parser.urlencoded({extended:true, limit:'50mb'})); 

// Set EJS as templating engine
app.set("view engine", "ejs");

// Create the schema (in other words, the database object structure specification)
var Schema = mongoose.Schema;
var FreelancerSchema = new Schema({
  username: String,
  hash: String,
  salt: Number,
  name: String,
  personName: String,
  bio: String,
  contact: String,
  price: Number,
  class: String,
});

var imgSchema = new Schema({
  img:{
    data:Buffer,
    contentType: String,
    username: String
  },
  
  
});

var image = mongoose.model("image",imgSchema);

var Freelancer = mongoose.model('Freelancer', FreelancerSchema)

// mongodb code

const db  = mongoose.connection;
const mongoDBURL = 'mongodb://127.0.0.1/';
mongoose.connect(mongoDBURL, { useNewUrlParser: true,
  useUnifiedTopology: true });
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// all get requests
app.get('/', (req, res) => { res.redirect('/index.html'); });
app.get('/testcookies', (req, res)=>{res.send(req.cookies);});

app.post("/uploadphoto",upload.single('myImage'),(req,res)=>{
  var img = fs.readFileSync(req.file.path);
  var encode_img = img.toString('base64');
  var final_img = {
      contentType:req.file.mimetype,
      image:new Buffer(encode_img,'base64'),
      username: req.cookies.login.username
  };

  image.create(final_img,function(err,result){
      if(err){
          console.log(err);
      }else{
          console.log(result.img.Buffer);
          console.log("Saved To database");
          res.contentType(final_img.contentType);
          res.send(final_img.image);
      }
  });
});

app.get('/login/:username/:password/', (req, res) => {
  Freelancer.find({username : req.params.username}).exec(function(error, results) {
    if (results.length == 1) {
      //console.log(results[0]);
      var password = req.params.password;
      var correct = isPasswordCorrect(results[0], password);
      if (correct) {
          var sessionKey = putSession(req.params.username);
          res.cookie("login", {username: req.params.username, key:sessionKey},
          {maxAge: TIMEOUT});
          res.end(req.params.username);
      } else {
        res.end(false);
      }
    } else {
      res.end(false);
    }
  });
});

app.get('/search/services/:keyWord', (req, res) => {
  Freelancer.find({ $or: [{name:{$regex: '.*'+req.params.keyWord+'.*'}},
  {class:{$regex: '.*'+req.params.keyWord+'.*'}}]})
    .exec(function (err, results) {
    if (err) return handleError(err);
    res.end(JSON.stringify(results));
  })
});

app.get('/create/:username/:password/:person/:name/:bio/:contact/:catagory/:price/', (req, res) => {
  Freelancer.find({username : req.params.username}).exec(function(error, results) {
    if (!error && results.length == 0) {

      var salt = Math.floor(Math.random() * 1000000000000);
      var hash = getHash(req.params.password, salt);

      var free = new Freelancer({
        'username': req.params.username,
        'hash': hash,
        'salt': salt,
        'name': req.params.name,
        'personName': req.params.person,
        'bio': req.params.bio,
        'contact': req.params.contact,
        'class':req.params.catagory,
        'price': req.params.price

    });
    console.log(free);

    free.save(function (err) {
      if (err) { res.end('ERROR'); }
      else { res.end('Account created!')
    };
    });
  } else {
    res.end('Username already taken');
  }

  });
});

app.get('/welcome/', (req, res) => {
  Freelancer.findOne({username : req.cookies.login.username})
    .exec(function (err, results) {
    if (err) return handleError(err);
    res.end(JSON.stringify(results));
  })
});

app.get('/edit/:name/:personName/:catagory/:bio/:contact/:price', (req, res) => {
  
      Freelancer.findOneAndUpdate({username : req.cookies.login.username}, {
        'name': req.params.name,
        'personName': req.params.personName,
        'bio': req.params.bio,
        'contact': req.params.contact,       
        'price': req.params.price,
        'class': req.params.catagory
      }, function (err, docs) {
        if (err){
            console.log(err);
        } 
      })
  });
  //implement update document



app.get('/logout/', (req, res) => {
  console.log(req.cookies.login.username);
  loggedOut(req.cookies.login.username)
  res.end("logged out"); });


  
// Start the server!

app.listen(80, () => { console.log('server has started'); });
//bug: doesnt show full description after creating new user