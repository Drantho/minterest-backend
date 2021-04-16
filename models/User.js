const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 25
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 25
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true        
    },
    mints: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Mint'
    }]
    //TODO add other feature models
});

UserSchema.pre('save', function(next){
    if(!this.isModified('password')){
        return next();
    }        
    
    bcrypt.hash(this.password, 10, (error, passwordHash) => {
        if(error){
            return next(error);
        }

        this.password = passwordHash;
        next();
    })
});

UserSchema.methods.comparePassword = function(password, cb){
    bcrypt.compareSync(password, this.password, (error, isMatch) => {
        if(error){
            cb(error);
        }
        else{
            if(!isMatch){
                return cb(null, isMatch);
            }
            return cb(null, this);
        }        
    })
}

module.exports = mongoose.model('User', UserSchema)
