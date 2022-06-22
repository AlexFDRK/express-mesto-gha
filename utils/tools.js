const validate = (err) => {
  const errorArr = [];
  const errorsList = Object.values(err.errors);
  errorsList.forEach((key) => {
    errorArr.push(key.message);
  });
  return { message: `Ошибка валидации: ${errorArr.join(' && ')}` };
};

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

module.exports = {
  validate,
  ValidationError,
};
