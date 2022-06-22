const INCORRECT_DATA_CODE = 400;
const ERROR_401_CODE = 401;
const ERROR_403_CODE = 403;
const ERROR_404_CODE = 404;
const DEFAULT_ERROR_CODE = 500;
const SERVER_ERROR_TEXT = 'Произошла ошибка на сервере';
const NO_ID_ERROR_TEXT = 'В БД отсутствуют записи с id: ';
const INCORRECT_ID_ERROR_TEXT = 'Запрошены данные с некорректным id';
const ERROR_404_TEXT = 'Error 404. Страница не найдена. Ꙭ';
const INCORRECT_EMAIL_FORMAT = 'Неверный формат почты';
const INCORRECT_PASSWORD = 'Ошибка авторизации';
const JWT_SECRET = 'some-secret-key';

module.exports = {
  INCORRECT_DATA_CODE,
  ERROR_403_CODE,
  ERROR_404_CODE,
  DEFAULT_ERROR_CODE,
  SERVER_ERROR_TEXT,
  NO_ID_ERROR_TEXT,
  INCORRECT_ID_ERROR_TEXT,
  ERROR_404_TEXT,
  INCORRECT_EMAIL_FORMAT,
  ERROR_401_CODE,
  INCORRECT_PASSWORD,
  JWT_SECRET,
};
