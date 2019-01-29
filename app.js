const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./server/routes/indexRoutes');
const users = require('./server/routes/usersRoutes');

const app = express();

// favicon
app.use(serveStatic(__dirname + '/public'));

// view engine setup
app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'jade');
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const debug = require('debug')('tank-battalion:server');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */
const port = (process.env.PORT || '8081'); //heroku config
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
const commonPort = app.listen(port, () => {
  console.log('App running on localhost:8081');
});

/**
 * Socket.io Communication.
 */
const io = require('socket.io').listen(commonPort);
require('./server/routes/socketIoRoutes')(io);
