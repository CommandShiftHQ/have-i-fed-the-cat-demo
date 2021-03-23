const bcrypt = require("bcrypt")

module.exports = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (error, hash) => {
    if (error) {
      next(error);
    }
    req.body.password = hash;
    return next();
  });
}