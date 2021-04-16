const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport/passport');
const User = require('../models/User');
const JWT = require('jsonwebtoken');

userRouter.post('/register', (req, res) => {
    const {username, password, role} = req.body;

    User.findOne({username}, (error, user) => {
        if(error){
            console.log(error)
            res.status(500).json(error);
        }

        if(user){
            res.status(400).json({msg: 'username unavailable.'});
        }else{
            const newUser = new User({username, password, role});
            newUser.save(error=>{
                if(error){
                    console.log(error)
                    res.status(500).json(error);
                }else{
                    res.status(201).json({msg: 'account created.'})
                }
            })
        }
    })
});

module.exports = userRouter;
