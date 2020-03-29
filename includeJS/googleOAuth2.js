var config = require('./config');
const axios= require('axios');
const jwt = require('jsonwebtoken')
const jsonDBFunctions = require('./jsonDBFunctions')
//var argon2 = require('./argon2');

const jwtKey = config.jwtKey;//'my_secret_key'
const jwtExpirySeconds = 1800

const oauth2 = require('simple-oauth2').create({
  client: {
    id: config.googleAPIInfo.client_id,//"473688800612-o50qhkeglt7gm93pshh3l1uahiprltnc.apps.googleusercontent.com",
    secret: config.googleAPIInfo.client_secret //"H_xwK9yBMHAqI-4kdhZV-cgM"
  },
  auth: {
    authorizeHost: 'https://accounts.google.com',
    authorizePath: '/o/oauth2/v2/auth',
 
    tokenHost: 'https://www.googleapis.com',
    tokenPath: '/oauth2/v4/token'
  }
});

const enforceSignIn = async (req, res, next) => {

    const authorizationUri = oauth2.authorizationCode.authorizeURL({
        redirect_uri: config.URI+config.googleAPIInfo.callbackURL,
        scope: 'profile email'
    });
    //localhost:8088/auth/google
    // Create a new token with the username in the payload
    // and which expires 300 seconds after issue
    const jwtToken = jwt.sign( {"redirectURL":req.originalUrl} , jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
    })

    // set the cookie as the token string, with a similar max age as the token
    // here, the max age is in milliseconds, so we multiply by 1000

    res.cookie('redirectInfo', jwtToken, { maxAge: jwtExpirySeconds/3 * 1000 }).status(200).redirect(authorizationUri);
}

const validateSession = async (req, res, next) => {

    // if the cookie is not set, return an unauthorized error
    if (!req.cookies) {
        return enforceSignIn(req, res, next);
    }
    
    const token = req.cookies.token

    // if the cookie is not set, return an unauthorized error
    if (!token) {
        return enforceSignIn(req, res, next);
    }
    
    var payload
    try {
        // Parse the JWT string and store the result in `payload`.
        // Note that we are passing the key in this method as well. This method will throw an error
        // if the token is invalid (if it has expired according to the expiry time we set on sign in),
        // or if the signature does not match
        payload = jwt.verify(token, jwtKey)
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            // if the error thrown is because the JWT is unauthorized, return a 401 error
            return enforceSignIn(req, res, next);
        }
        // otherwise, return a bad request error
        return enforceSignIn(req, res, next);
    }
    req.session={}
    req.session.payload=payload;
    /*
     * Legacy code used req.user (to support auth0 website).
     * So, keep payload in eeq.user also.
     */
    req.user=payload
    req.user.user_id="google-oauth2"+payload.sub
    // We ensure that a new token is not issued until enough time has elapsed
    // In this case, a new token will only be issued if the old token is within
    // 60 seconds of expiry. Otherwise, ust continue
    const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
    if (payload.exp - nowUnixSeconds > 90) {
        return next();
    }
    payload.iat=undefined
    payload.exp=undefined
    let newPayload=JSON.parse(JSON.stringify(payload))

    // Now, create a new token for the current user, with a renewed expiration time
    const newToken = jwt.sign(newPayload, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
    })


    res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 })
    next();
  };

const authCallBack = async (req, res) => {
  const code = req.query.code;
  let redirectURL="/mygroup/myInfo"
  const options = {
    code,
    redirect_uri: config.URI+config.googleAPIInfo.callbackURL
  };

    try{
        // if the cookie is not set, return an unauthorized error
        if (!req.cookies) {
            console.log("No cookies... Standard login")
        }
        
        const redirectInfo = req.cookies.redirectInfo

        // if the cookie is not set, return an unauthorized error
        if (!redirectInfo) {
            console.log("No token")
        }
        
        let redirectData
        try {
            // Parse the JWT string and store the result in `payload`.
            // Note that we are passing the key in this method as well. This method will throw an error
            // if the token is invalid (if it has expired according to the expiry time we set on sign in),
            // or if the signature does not match
            redirectData = jwt.verify(redirectInfo, jwtKey)
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>> redirectData <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
            console.log(redirectData)
            redirectURL=redirectData.redirectURL
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>> redirectURL <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
            console.log(redirectURL)
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
            // if the error thrown is because the JWT is unauthorized, return a 401 error
                console.log("JsonWebTokenError")
            }
            // otherwise, return a bad request error
                console.log("bad request error")
        }        
    }
    catch(e){console.log(e)}
  
  try {
    // The resulting token.
    const result = await oauth2.authorizationCode.getToken(options);
 
    // Exchange for the access token.
    const token = oauth2.accessToken.create(result);
 
    resp=JSON.stringify(token.token)
    respObj=JSON.parse(resp)

    const body = await axios({
      url: 'https://openidconnect.googleapis.com/v1/userinfo',
         method:'get',
     headers: {authorization: `Bearer ${respObj.access_token}`}
    })

    
    // Create a new token with the username in the payload
    // and which expires 300 seconds after issue
    const jwtToken = jwt.sign( body.data , jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
    })

    // set the cookie as the token string, with a similar max age as the token
    // here, the max age is in milliseconds, so we multiply by 1000

    res.cookie('token', jwtToken, { maxAge: jwtExpirySeconds * 1000 }).status(200).redirect(`${redirectURL}`)
    let payload = body.data
    payload.user_id="google-oauth2"+payload.sub

    jsonDBFunctions.updateUserInfo(payload);
 
  } catch (error) {
    console.error('Access Token Error', error.message);
    return res.status(500).json('Authentication failed');
  }


}

const signIn = async (req, res) => {

  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: config.URI+config.googleAPIInfo.callbackURL,
    scope: 'profile email'
  });
    const jwtToken = jwt.sign( {"redirectURL":"/mygroup/myInfo"} , jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds
    })

    // set the cookie as the token string, with a similar max age as the token
    // here, the max age is in milliseconds, so we multiply by 1000

    res.cookie('redirectInfo', jwtToken, { maxAge: jwtExpirySeconds/3 * 1000 }).status(200).redirect(authorizationUri);


}

module.exports = {
  signIn,
  authCallBack,
  validateSession
}
