var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'bigdropletenergy',
  saveUninitialized: true,
  resave: true
}));

app.use('/', require('./routes/index'));
app.use('/helloworld', require('./routes/helloworld'));
app.use('/hellodata', require('./routes/hellodata'));
app.use('/env', require('./routes/env'));
app.use('/sessionpage1', require('./routes/sessionpage1'));
app.use('/sessionpage2', require('./routes/sessionpage2'));
app.use('/clearsession', require('./routes/clearsession'));
app.use('/formcollection', require('./routes/formcollection'));
app.use('/echo', require('./routes/echo'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('404');
});


module.exports = app;
