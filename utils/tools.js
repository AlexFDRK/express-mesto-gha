module.exports.validate = (err) => {
  const errorArr = [];
  const errorsList = Object.values(err.errors);
  errorsList.forEach((key) => {
    errorArr.push(key.message);
  });
  return { message: `Ошибка валидации: ${errorArr.join(' && ')}` };
};
