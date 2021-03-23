const { User } = require("../models");

exports.create = (req, res) => {
  User.create(req.body).then(userDocument => res.status(201).json(userDocument))
}