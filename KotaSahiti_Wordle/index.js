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

var mysql = require('mysql');

var sql_params = {
  connectionLimit : 10,
  user            : process.env.DIRECTOR_DATABASE_USERNAME,
  password        : process.env.DIRECTOR_DATABASE_PASSWORD,
  host            : process.env.DIRECTOR_DATABASE_HOST,
  port            : process.env.DIRECTOR_DATABASE_PORT,
  database        : process.env.DIRECTOR_DATABASE_NAME
}

app.locals.pool  = mysql.createPool(sql_params);

//cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// ion authentication
const https = require('https')
const cookieSession = require('cookie-session')
const { AuthorizationCode } = require('simple-oauth2') // load packages

app.listen(3000, () => {
  console.log(`Example server started`)
})

// -------------- routes -------------- //
const home = require('./routes/home.js')
app.use(home);

const mylabs = require('./routes/mylabs.js')
app.use(mylabs);

const madlibs = require('./routes/madlibs.js')
app.use(madlibs);

const weather = require('./routes/weather.js')
app.use('/getweather', weather);

const numbersRouter = require('./routes/numbersRouter.js');
app.use(
  '/numbers',
  numbersRouter
);

app.use('/voting', require('./routes/votesSQL_router.js'))

const wordle = require('./routes/wordleFs_router.js')
app.use(wordle);

const cookie = require('./routes/cookie.js')
app.use(cookie);

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