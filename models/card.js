const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Длина поля \'Имя картинки\' менее 2 символов'],
    maxlength: [30, 'Длина поля \'Имя картинки\' более 30 символов'],
    required: [true, 'Поле \'Имя картинки\' - не заполнено'],
  },
  link: {
    type: String,
    required: [true, 'Поле \'Ссылка на изображение\' - не заполнено'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле \'Владелец\' - не заполнено'],
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', default: [] }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
