const express = require('express');
var router = express.Router();

router.get('/mylabs', function(req,res){
    res.render('mylabs');
});

module.exports = router;