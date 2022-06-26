const mongoose = require('mongoose');

function linkValidator(val) {
  const regex = /(https?:\/\/)(w{3}\.)?(\w|-|_)*.[a-zA-Z]{2,3}(\w|\W)*/;
  return regex.test(val);
}

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, "Длина поля 'Имя картинки' менее 2 символов"],
    maxlength: [30, "Длина поля 'Имя картинки' более 30 символов"],
    required: [true, "Поле 'Имя картинки' - не заполнено"],
  },
  link: {
    type: String,
    required: [true, "Поле 'Ссылка на изображение' - не заполнено"],
    validate: linkValidator,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, "Поле 'Владелец' - не заполнено"],
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', default: [] }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
