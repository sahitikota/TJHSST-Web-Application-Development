const express = require('express');
const router = express.Router()

// built in module for working with files
const fs = require('fs')

// built in module for working with paths
const path = require('path')

// GET ALL FIVE LETTER WORDS
const all_words = fs.readFileSync(path.join('/site','public','data','enable.txt')).toString().split('\n')
const five_letter_words = all_words.filter(function(elem){
    if (elem.length == 5) {
    	return true;
    } else {
    	return false;
    }
})

router.get('/wordleform', function(req,res){
    res.render('wordleForm');
});

/*router.get('/wordleCalc',function(req,res){
  let destination1Letter = req.query.firstLetter
  let destination2Letter = req.query.secondLetter
  let destination3Letter = req.query.thirdLetter
  let destination4Letter = req.query.fourthLetter
  let destination5Letter = req.query.fifthLetter
  let redirect_url = 'https://user.tjhsst.edu/2023skota/enable/?letter1=' + destination1Letter + '&letter2=' + destination2Letter + '&letter3=' + destination3Letter + '&letter4=' + destination4Letter + '&letter5=' + destination5Letter
  res.redirect(redirect_url)
})*/

router.get('/enable', async function(req,res){
    let wordleLetterOne;
    let wordleLetterTwo;
    let wordleLetterThree;
    let wordleLetterFour;
    let wordleLetterFive;
    let letterOne;
    let letterTwo;
    let letterThree;
    let letterFour;
    let letterFive;
    if ('letter1' in req.query) {
        wordleLetterOne = req.query.letter1;
        console.log('x')
        console.log(wordleLetterOne)
    } 
    if ('letter2' in req.query) {
        wordleLetterTwo = req.query.letter2;
    }
    if ('letter3' in req.query) {
        wordleLetterThree = req.query.letter3;
    }
    if ('letter4' in req.query) {
        wordleLetterFour = req.query.letter4;
    }
    if ('letter5' in req.query) {
        wordleLetterFive = req.query.letter5;
    }
    
    let truncated_list = five_letter_words.filter(function(elem){
        if (elem.charAt(0) == wordleLetterOne.toLowerCase() || wordleLetterOne === "") {
            if (elem.charAt(1) == wordleLetterTwo.toLowerCase() || wordleLetterTwo === "") {
                if (elem.charAt(2) == wordleLetterThree.toLowerCase() || wordleLetterThree === "") {
                    if (elem.charAt(3) == wordleLetterFour.toLowerCase() || wordleLetterFour === "") {
                        if (elem.charAt(4) == wordleLetterFive.toLowerCase() || wordleLetterFive === "") {
                            return true;
                        }
                    }
                }
            }
        } else {
        	return false;
        }
	})
    res.json({'words':truncated_list})
})
module.exports = router;