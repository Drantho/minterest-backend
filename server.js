const express = require('express');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();

const app = express();

app.use(compression());
app.use(cors());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))