module.exports.validate = (err) => {
  const errorArr = [];
  const _errors = Object.values(err.errors);
  _errors.forEach((key) => {
    errorArr.push(key.message);
  });
  return { message: `Ошибка валидации: ${errorArr.join(' && ')}` };
};
