// importing modules
const mongoose = require('mongoose');
const express = require('express');
const parser = require('body-parser')
const cookieParser = require('cookie-parser');
const app = express();

// all app.use calls go here

app.use(parser.text({type: '*/*'}));
app.use(cookieParser());
app.use(express.static('public_html'));

// mongodb code

const db  = mongoose.connection;
const mongoDBURL = 'mongodb://127.0.0.1/';
mongoose.connect(mongoDBURL, { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// all get requests
app.get('/', (req, res) => { res.redirect('/index.html'); });

// Start the server!

app.listen(80, () => { console.log('server has started'); });
