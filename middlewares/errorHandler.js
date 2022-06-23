const {
  INCORRECT_DATA_CODE,
  DEFAULT_ERROR_CODE,
  SERVER_ERROR_TEXT,
  NO_ID_ERROR_TEXT,
  INCORRECT_ID_ERROR_TEXT,
  ERROR_404_CODE,
} = require('../utils/constants');
const { validate } = require('../utils/tools');

let status;
let message;

const errorHandler = (res, err, id) => {
  console.log({ err, id });

  if (!err && id) {
    status = ERROR_404_CODE;
    message = `${NO_ID_ERROR_TEXT} ${id}`;
  } else if (err && err.name === 'ValidationError') {
    status = INCORRECT_DATA_CODE;
    message = validate(err);
  } else if (err && err.name === 'CastError') {
    status = INCORRECT_DATA_CODE;
    message = INCORRECT_ID_ERROR_TEXT;
  } else {
    status = DEFAULT_ERROR_CODE;
    message = SERVER_ERROR_TEXT;
  }

  res.status(status).send(message);
};

module.exports = { errorHandler };
