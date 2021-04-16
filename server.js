const express = require('express');
const cors = require('cors');
const compression = require('compression');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(compression());
app.use(cors());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb', extended: true, parameterLimit: 50000 }));

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true}, () => {
    console.log(`mongodb connected.`);
});

const userRouter = require('./routes/userRouter');
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))