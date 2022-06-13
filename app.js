const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const { ERROR_404_CODE, ERROR_404_TEXT } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, _res, next) => {
  req.user = {
    _id: '62a4b8b5421ba5bc66cf1182',
  };

  next();
});

app.use('/users', require('./routers/users'));

app.use('/cards', require('./routers/cards'));

app.get('/', (_req, res) => {
  res.send({ message: 'Main page' });
});

app.use('*', (_req, res) => {
  res.status(ERROR_404_CODE).send({ message: ERROR_404_TEXT });
});

app.listen(PORT, () => {
  console.log(`Listeninng port ${PORT}`);
});
