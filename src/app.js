const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

require('./models');
const passport = require('./config/passport');

app.use(passport.initialize());

app.use(cors());

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(require('./routes/product'));
app.use(require('./routes/auth'));
app.use(require('./routes/review'));
app.use(require('./routes/address'));
app.use(require('./routes/category'));
app.use(require('./routes/order'));
app.use(require('./routes/image'));
app.use(require('./middlewares/error'));

const dir = path.join(__dirname, '..', 'uploads');
app.use(express.static(dir));

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

if (process.env.NODE_ENV !== 'TEST') {
  const server = app.listen(5000, () => {
    console.log('Listening on port ' + server.address().port);
  });
}

module.exports = app;
