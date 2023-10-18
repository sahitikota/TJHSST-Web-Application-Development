const express = require('express');
var router = express.Router();

router.set('trust proxy', 1)
router.use(cookieSession({
  name: 'chocalatechip', // name of the cookie
  keys: ['sugar', 'gingerbread'] // keys to sign the cookie to make it secure
}))

const client_id = 'eQCogAEViOhMN1yDFulRA0EEcNBzjYNWKg2SM0Er'
const secret_key = 'aKv8ByLbOrAkRo3DQwCcR7altaYQV8YpGi9yLzjUa04sWWCTIcCgAkcge76HF13H1IAXA6X5mVBXpatgf13QNj0DMCXshtuRMeTNyU9SYJE8IJynvMeGOyf7PYqPfLKF'

const client = new AuthorizationCode({
  client: {
    id: client_id,
    secret: secret_key,
  },
  auth: {
    tokenHost: 'https://ion.tjhsst.edu/oauth/',
    authorizePath: 'https://ion.tjhsst.edu/oauth/authorize',
    tokenPath: 'https://ion.tjhsst.edu/oauth/token/'
  }
})

const redirect_link = 'https://user.tjhsst.edu/2023skota/login'

const authorizationUri = client.authorizeURL({
  scope: "read",
  redirect_uri: redirect_link
})

function checkAuthentication(req, res, next) {
  if ('authenticated' in req.session) { // the user is logged in
    next()
  }
  else {
    res.render('unverified', {'login_link' : authorizationUri}) // the user is not logged in, so render the unverified page and send the login link
  }
}

async function convertCodeToToken(req, res, next) {
  const options = {
    'code': req.query.code, // code we get after logging in
    'redirect_uri': redirect_link,
    'scope': 'read'
  }
  
  try {
    const accessToken = await client.getToken(options) // wait for oauth to get the token
    res.locals.token = accessToken.token // store the access token in res.locals.token
    next()
  } 
  catch (error) { // if there is an error getting the access token, we will send an error
    console.log('Access Token Error')
    console.log(error.message)
    res.send('Something broke!')
  }
}

router.get('/login', [checkAuthentication], function(req,res){
    res.render('login');
});

module.exports = router;