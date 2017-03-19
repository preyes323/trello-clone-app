const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('client-sessions');
const bcrypt = require('bcryptjs');
const csrf = require('csurf');

const all = require('./routes/all');
const app = express();

const usersFilePath = './data/users.json';
const usersApi = Object.create(require('./api/JSON-crud')).init(usersFilePath);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  cookieName: 'session',
  secret: 'asd123sdfasd*213123asd',
  activeDuration: 30 * 60 * 1000,
  httpOnly: true,
  ephemeral: true,
}));

app.use(function(req, res, next) {
  let user;
  if (req.session && req.session.user) {
    user = usersApi.findOne('email', req.session.user.email);
    if (user) {
      req.user = user;
      delete req.user.password;
      req.session.user = req.user;
      res.locals.user = req.user;
    }
  }

  next();
});

app.use(csrf());

app.use('/', all);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.redirect('/dashboard');
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
