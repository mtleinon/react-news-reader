/* Simple API for serving React app and executing newsapi call. 
   newsapi key is added to the end of the request. The key is for 
   a free account that allows 500 requests a day. There is no 
   authentication, so anyone using the app can use the app and
   this API.
*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var apiRouterV2 = require('./routes/v2');

var app = express();

app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/v2', apiRouterV2);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use(logger('dev'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.debug('TEST err =', err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
