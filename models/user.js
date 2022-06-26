const mongoose = require('mongoose');

function emailValidator(val) {
  const regex = /(\w|\-|\.)+@(\w)+.[a-zA-Z]{2,3}/;
  return regex.test(val);
}

function linkValidator(val) {
  const regex = /(https?:\/\/)(w{3}\.)?(\w|\-|\_)*.[a-zA-Z]{2,3}(\w|\W)*/;
  return regex.test(val);
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Поле 'email' - не заполнено"],
    unique: [true, "Поле 'email' - не уникально"],
    validate: emailValidator,
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
    validate: linkValidator,
  },
});

userSchema.set('toJSON', {
  transform(doc, ret) {
    const rett = ret;

    delete rett.password;
    return rett;
  },
});

module.exports = mongoose.model('user', userSchema);
