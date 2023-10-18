const express = require('express');
const router = express.Router()

var https = require('https')

var options = { 
	headers : {
		'User-Agent': 'request'
	}
}

router.get('/weatherform', function(req,res, next){
    console.log(req.body)
    var url = 'https://api.weather.gov/points/${latitude},${longitude}'
    https.get(url, options, function(response) {
	    var rawData = '';
	    response.on('data', function(chunk) {
		    rawData += chunk;
        });
	    response.on('end', function() {
	        console.log('E')
            // console.log(rawData); // THIS IS WHERE YOU HAVE ACCESS TO RAW DATA
            var obj = JSON.parse(rawData);
            console.log(obj["properties"]["periods"][0])
                var params = {
                    'forecast' : obj.properties.periods
                }
                res.render('weatherForm', params);
        });
        }).on('error', function(e) {
	        console.error(e);
    });
});

router.post('/results', function(req,res, next){
    let out = {
        'latitude' : '',
        'longitude' : ''
    }
    if('latitude' in req.body) {
        out.latitude = req.body.latitude
    }
    if('longitude' in req.body) {
        out.longitude = req.body.longitude
    }
    res.render('weatherResults', out)
});

module.exports = router;