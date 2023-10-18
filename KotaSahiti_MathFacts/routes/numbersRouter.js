const express = require('express');
const router = express.Router()

router.get('/numberform', function(req,res){
    res.render('numberform');
});

router.get('/mathFacts',function(req,res){
    console.log(req.params)
  let destinationNumber = req.query.number
  let redirect_url = 'https://user.tjhsst.edu/2023skota/numbers/' + destinationNumber
  res.redirect(redirect_url)
})

router.get('/:n',function(req,res){
  console.log(req.params)

  let out = {
    'number' : ''
  }

  let num = req.params.n;
  num = Number(num);
  
  if (isNaN(num)) {
    out.number = 'invalid input'
  } else {
    out.number = num
  }
  res.render('mathFacts', out)
})

module.exports = router;