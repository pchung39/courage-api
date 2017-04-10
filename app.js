var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var entries = require('./routes/entries');
var users = require("./routes/users");
var auth = require("./routes/auth_routes");
var mongoose = require('mongoose');
var http = require("http");
var app = express();
var util = require('util');
var cors = require("cors");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://paul:test@ds125060.mlab.com:25060/courage')
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json({type: "*/*"}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());


auth(app);
app.use("/users", users);
app.use('/entries', entries);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
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

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on: ", port);

module.exports = app;
