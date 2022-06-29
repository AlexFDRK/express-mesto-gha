const jwt = require('jsonwebtoken');
const { JWT_SECRET, ERROR_401 } = require('../utils/constants');
const СustomError = require('../utils/customError');

const auth = (req, res, next) => {
  const { cookies } = req;
  if (!cookies) {
    return next(new СustomError('Неуспешная авторизация', ERROR_401));
  }
  const token = cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new СustomError('Ошибочный токен', ERROR_401));
  }
  req.user = payload;

  return next();
};

module.exports = { auth };
