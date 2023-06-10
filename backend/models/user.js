const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const isEmail = require('validator/lib/isEmail');
const { urlRegEx } = require('../utils/constants');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },

  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },

  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegEx.test(v),
      message: 'Формат ссылки неправильный',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Формат почты неправильный',
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
