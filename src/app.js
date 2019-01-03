const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

require('./models');
const passport = require('./config/passport');

app.use(passport.initialize());

app.use(require('method-override')());
app.use(cors());

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'DEV') {
  // eslint-disable-next-line
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
// eslint-disable-next-line
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500).send('error', {
    message: err.message,
    error: {}
  });
});

app.use(require('./routes/product.routes'));
app.use(require('./routes/auth.routes'));
app.use(require('./routes/review.routes'));
app.use(require('./routes/address.routes'));
app.use(require('./routes/category.routes'));
app.use(require('./routes/order.routes'));
app.use(require('./routes/image.routes'));

const dir = path.join(__dirname, '..', 'uploads');
app.use(express.static(dir));

if (process.env.NODE_ENV !== 'TEST') {
  const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port ' + server.address().port);
  });
}

module.exports = app;
