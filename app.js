const express = require('express');
const app = express();
require('dotenv').config();
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/user.js');
const categoryRoute = require('./routes/category.js');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');

// Database conncetion
mongoose.connect(
    process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true}
).then( () => console.log('Database Connceted') );

mongoose.connection.on('error', err => {
    console.log(`DB Conncetion Error: ${err.message}` );
});

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())

// route middleware
app.use("/api",authRoute);
app.use("/api",userRoute);
app.use("/api",categoryRoute);

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});