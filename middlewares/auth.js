const jwt = require('jsonwebtoken');
const { ERROR_401_CODE, JWT_SECRET } = require('../utils/constants');

const auth = (req, res, next) => {
  const { cookies } = req;
  if (!cookies) {
    next(res.status(403).send({ error: 'Неуспешная авторизация' }));
  } else {
    const token = cookies.jwt;
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(res.status(ERROR_401_CODE).send({ error: 'Ошибочный токен' }));
    }
    req.user = payload;
  }
  next();
};

module.exports = { auth };
