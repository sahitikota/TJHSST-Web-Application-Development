const express = require('express');
var router = express.Router();

router.get('/cookie', function(req, res) {
  if (req.cookies.clicks === undefined) { // checks to see if the cookie 'clicks' exists, and if not (undefined) it will create the cookie with a value of 0
    res.cookie('clicks', 0)
    res.render('cookie', {count: req.cookies.clicks}) // render index.hbs and send the value of the cookie 'clicks'
  }
  else {
    res.render('cookie', {count: req.cookies.clicks}) // render index.hbs and send the value of the cookie 'clicks'
  }
})

router.post('/add', function(req, res) {
  res.cookie('clicks', parseInt(req.cookies.clicks)+1) // takes the value of the cookie 'clicks', parses it as an integer, and adds 1 to it. sets that value to the cookie
  res.send({count: parseInt(req.cookies.clicks)+1}) // return value of cookie back to the webpage
})

router.post('/reset', function(req, res) {
  res.cookie('clicks', 0) // sets value of cookie 'clicks' to 0
  res.send({count: 0}) // sends it back to the webpage
})

module.exports = router;