const express = require('express');
var router = express.Router();

app.get('/logout', function (req, res) { // when a user visits /logout, they will be logged out
  delete req.session.authenticated
  res.redirect('/') // redirect user back to home page
})

module.exports = router;