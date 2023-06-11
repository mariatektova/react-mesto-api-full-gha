// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');
const config = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    next(new Unauthorized('Авторизуйтесь'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    next(new Unauthorized('Авторизуйтесь'));
    return;
  }
  req.user = payload;
  next();
};
