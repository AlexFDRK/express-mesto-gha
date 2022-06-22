const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Поле 'email' - не заполнено"],
    unique: [true, "Поле 'email' - не уникально"],
  },
  password: {
    type: String,
    required: [true, "Поле 'Пароль' - не заполнено"],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, "Длина поля 'Имя пользователя' менее 2 символов"],
    maxlength: [30, "Длина поля 'Имя пользователя' более 30 символов"],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, "Длина поля 'О пользователе' менее 2 символов"],
    maxlength: [30, "Длина поля 'О пользователе' более 30 символов"],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error('Неправильные почта или пароль'));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
