const AUTHORIZATION_ERROR_TEXT = 'Ошибка авторизации';
const ERROR_404_TEXT = 'Error 404. Страница не найдена. Ꙭ';
const MISSING_ID_ERROR_TEXT = 'Обращение к данным с отсутствующим в базе данных id';
const NOT_OWNER_ERROR_TEXT = 'Нельзя удалять или модифицировать данные занесенные не вашим пользователем';
const DATA_NOT_FOUND_TEXT = 'Запрашиваемые данные не найдены';
const JWT_SECRET = 'some-secret-key';

const ERROR_400 = 400;
const ERROR_401 = 401;
const ERROR_403 = 403;
const ERROR_404 = 404;
const ERROR_409 = 409;

module.exports = {
  AUTHORIZATION_ERROR_TEXT,
  JWT_SECRET,
  ERROR_404_TEXT,
  MISSING_ID_ERROR_TEXT,
  NOT_OWNER_ERROR_TEXT,
  DATA_NOT_FOUND_TEXT,
  ERROR_400,
  ERROR_401,
  ERROR_403,
  ERROR_404,
  ERROR_409,
};
