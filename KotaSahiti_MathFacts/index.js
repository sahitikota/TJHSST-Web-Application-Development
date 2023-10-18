#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs')

app.use( express.static('static_files') )

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------- routes -------------- //
const home = require('./routes/home.js')
app.use(home);

const mylabs = require('./routes/mylabs.js')
app.use(mylabs);

const madlibs = require('./routes/madlibs.js')
app.use(madlibs);

const numbersRouter = require('./routes/numbersRouter.js');
app.use(
  '/numbers',
  numbersRouter
);

app.use(express.static('static_files'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/*', function (req, res) {
  res.render('home') 
})

// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});