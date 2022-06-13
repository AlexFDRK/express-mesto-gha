const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Длина поля \'Имя пользователя\' менее 2 символов'],
    maxlength: [30, 'Длина поля \'Имя пользователя\' более 30 символов'],
    required: [true, 'Поле \'Имя пользователя\' - не заполнено'],
  },
  about: {
    type: String,
    minlength: [2, 'Длина поля \'О пользователе\' менее 2 символов'],
    maxlength: [30, 'Длина поля \'О пользователе\' более 30 символов'],
    required: [true, 'Поле \'О пользователе\' - не заполнено'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле \'Аватар\' - не заполнено'],
  },
});

module.exports = mongoose.model('user', userSchema);
