const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://mesto.alexfdrk.nomoreparties.sbs',
  'https://mesto.alexfdrk.nomoreparties.sbs',
  'http://api.alexfdrk.nomoredomains.xyz',
  'https://api.alexfdrk.nomoredomains.xyz',
  'http://localhost:3000',
  'https://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const permissions = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};

module.exports = { permissions };
