const express = require('express');
const router = express.Router()
var https = require('https');

router.get('/selection', function(req,res){
    let sqlQuery = 'SELECT char_name, nails_id FROM nails;'
    res.app.locals.pool.query(sqlQuery, function(error,results,fields){
        let out = {
            'nail_names' : results
        }
        out = Object.assign(out)
        res.render('allocation', out);
    })
})

function sqlPromise(pool, sqlQuery, params) {
    return new Promise(function(resolve,reject){
        pool.query(sqlQuery, params,function (error,results,fields){
            if (error) throw error;
            console.log(results)
            resolve(results)
        })
    })
}

router.get('/do_votes', async function(req,res){
    let user_values = req.query;
    let sqlParams = [];
    if ('nail_img_id' in user_values) {
        sqlParams = [user_values.nail_img_id]
    }

    let sqlQuery = 'UPDATE nails SET votes = votes+1 WHERE nails_id=?;'
    await sqlPromise(res.app.locals.pool, sqlQuery, sqlParams);

    let sqlQuery2 = 'SELECT * FROM nails;'
    
    let nailOut = await sqlPromise(res.app.locals.pool, sqlQuery2, sqlParams);
    let out = Object.assign(
        {'nail_names' : nailOut});
    console.log('x')
    console.log(out)
    res.render('thanks', out)
    
})

module.exports = router;
