const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const СustomError = require('../utils/customError');

const auth = (req, res, next) => {
  console.log('auth');

  const { cookies } = req;
  if (!cookies) {
    return next(new СustomError('Неуспешная авторизация', 403));
  }
  const token = cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    return next(new СustomError('Ошибочный токен', 401));
  }
  req.user = payload;

  return next();
};

module.exports = { auth };
