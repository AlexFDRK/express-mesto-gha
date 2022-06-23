const user = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  user
    .find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      next(new Error(req.params.cardId));
    });
};

module.exports.findUserById = (req, res, next) => {
  user.findById(req.params.id).then((data) => {
    if (!data) {
      return next(new Error(req.params.cardId));
    }
    return res.send({ data });
  });
  // .catch((err) => {
  //   errorHandler(res, err);
  // });
};

module.exports.getMe = (req, res) => {
  user
    .findById(req.user)
    .select('-password')
    .then((data) => {
      if (!data) {
        //        errorHandler(res, undefined, req.params.id);
      } else {
        res.send({ data });
      }
    })
    .catch((err) => {
      //      errorHandler(res, err);
    });
};

module.exports.patchMe = (req, res) => {
  const { name, about } = req.body;
  const _id = req.user;

  user
    .findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((data) => {
      if (data) {
        res.send({ data });
      } else {
        //        errorHandler(res, undefined, req.params.id);
      }
    })
    .catch((err) => {
      //      errorHandler(res, err);
    });
};

module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;
  const _id = req.user;

  user
    .findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((data) => {
      if (data) {
        res.send({ data });
      } else {
        //        errorHandler(res, undefined, req.params.id);
      }
    })
    .catch((err) => {
      //      errorHandler(res, err);
    });
};
