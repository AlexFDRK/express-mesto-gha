class СustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = СustomError;

// /* eslint-disable no-underscore-dangle */
// class CustomError extends Error {
//   constructor(err, statusCode, id) {
//     super(err === undefined ? err : this._validate());
//     this._err = err;
//     this.statusCode = statusCode;
//     this.id = id;
//   }

//   _validate() {
//     const errorArr = [];
//     const errorsList = Object.values(this._err.errors);
//     errorsList.forEach((key) => {
//       errorArr.push(key.message);
//     });
//     return { message: `Ошибка валидации: ${errorArr.join(' && ')}` };
//   }
// }

// module.exports = CustomError;
