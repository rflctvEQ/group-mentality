const { Moderator } = require('../models')

const modAuth = (req, res, next) => {
  // If the user is not a moderator, redirect the request to the login route
  Moderator.findById(req.session.id).exec(function (err, moderator) {
    if (err) {
      return next(err);
    } else {
      if (moderator === null) {
        let err = new Error('Not authorized!');
        err.status = 400;
        return next(err);
      } else {
        return next();
      };
    };
  });
};
  
module.exports = modAuth;