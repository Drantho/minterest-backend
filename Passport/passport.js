const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/User');

const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET
}, (payload, done) => {
    User.findById({_id: payload.sub}, (error, user) => {
        if(error){
            return done(error, false);
        }

        if(user){
            return done(null, user);
        }

        return done(null, false);
    })
}))

passport.use(new LocalStrategy((username, password, done)=>{
    User.findOne({username}, (error, user) => {
        if(error){
            return done(error);
        }

        if(!user){
            return done(null, false);
        }

        user.comparePassword(password, done);
    })
}))

