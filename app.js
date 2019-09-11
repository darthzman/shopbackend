const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config/index');
const errorHandler = require('./midlewares/errorHandler');
const passportJWT = require('./midlewares/passportJWT');

//connect mongoose
const mongoose = require('mongoose');
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
});


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const settingRouter = require('./routes/setting');
const shopRouter = require('./routes/shop');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//localhost:3000/api/user/register
app.use('/api/users', usersRouter);
//localhost:3000/api/setting
app.use('/api/setting', passportJWT.isLogin, settingRouter);
app.use('/api/shop', passportJWT.isLogin, shopRouter);

app.use(errorHandler);

module.exports = app;
