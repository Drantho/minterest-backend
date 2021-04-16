const passport = require('pass');
const FacebookStrategy = require('passport-facebook');

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackUrl: '/auth/facebook/callback'
},
(accessToken, refreshToken, profile, cb)=>{
    console.log(profile);

    return cb(null, profile);
}));

