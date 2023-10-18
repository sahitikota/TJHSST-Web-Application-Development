#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();

app.set('view engine','ejs')

app.use(express.static('static_files'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let count = 0;

app.get('/', function(req,res){
    res.render('home');
});

app.get('/mylabs', function(req,res){
    res.render('mylabs');
});

app.get('/it_works',function(req,res){
    console.log('someone is landing on my page');
    res.render('works_template');
});

app.get('/flip',function(req,res){
    console.log('flipping rn');
    if(Math.random() < 0.5) {
        res.render('win');
    }
    else {
        res.render('lose');
    }
});

app.get('/schedule',function(req,res){
    let schedule = {
        "count": 110,
        "next": "https://ion.tjhsst.edu/api/schedule?page=5",
        "previous": "https://ion.tjhsst.edu/api/schedule?page=3",
        "results": [
            {
                "url": "https://ion.tjhsst.edu/api/schedule/2022-09-01",
                "date": "2022-09-01",
                "day_type": {
                    "name": "Blue Day",
                    "special": false,
                    "blocks": [
                        {
                            "order": 1,
                            "name": "Period 1",
                            "start": "8:40",
                            "end": "10:15"
                        },
                        {
                            "order": 2,
                            "name": "Period 2",
                            "start": "10:25",
                            "end": "12:00"
                        },
                        {
                            "order": 3,
                            "name": "Lunch",
                            "start": "12:00",
                            "end": "12:40"
                        },
                        {
                            "order": 4,
                            "name": "Period 3",
                            "start": "12:40",
                            "end": "14:15"
                        },
                        {
                            "order": 5,
                            "name": "Period 4",
                            "start": "14:25",
                            "end": "16:00"
                        }
                    ]
                }
            }
        ]
    }
    schedule.results[0].day_type.blocks.forEach(function(elem) {
        console.log(elem.name)
    })
    res.render('schedule', schedule);
});

app.get('/madlibs', function(req,res){
  res.render('madlibs');
});

app.post('/madlibs_results', function(req,res){
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

// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});