const express = require('express');
var router = express.Router();


router.get('/madlibs', function(req,res){
  res.render('madlibs');
  console.log(req.body)
});

router.post('/madlibs_results', function(req,res){
    console.log(req.body)
    let out = {
        'name1' : '',
        'name2' : '',
        'color' : '',
        'food' : '',
        'activity' : '',
        'gross' : '',
        'car' : ''
    }
    if('name1' in req.body) {
        out.name1 = req.body.name1
    }
    if('name2' in req.body) {
        out.name2 = req.body.name2
    }
    if('color' in req.body) {
        out.color = req.body.color
    }
    if('food' in req.body) {
        out.food = req.body.food
    }
    if('activity' in req.body) {
        out.activity = req.body.activity
    }
    if('gross' in req.body) {
        out.gross = req.body.gross
    }
    if('car' in req.body) {
        out.car = req.body.car
    }
    res.render('madlibs_results', out);
});

module.exports = router;