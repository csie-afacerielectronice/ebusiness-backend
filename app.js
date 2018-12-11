const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

require('./src/models');
const passport = require('./src/config/passport');

app.use(passport.initialize());

app.use(require('method-override')());
app.use(cors());

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (!isProduction) {
  app.use(errorhandler());
}

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  app.use(function (err, req, res, next) {
    console.log('error');
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
// eslint-disable-next-line
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port ' + server.address().port);
});
