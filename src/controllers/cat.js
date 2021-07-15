const { Cat } = require('../models');
const errorHandler = require('../utils/error-handler');

exports.create = (req, res) => {
  Cat.create(req.body)
    .then((cat) => res.status(201).json(cat))
    .catch((error) => {
      errorHandler(req, res, error);
    });
};

exports.readAll = (req, res) => {
  Cat.findAll({ where: req.query })
    .then((cats) => {
      res.status(200).json({ cats });
    })
    .catch((error) => {
      errorHandler(req, res, error);
    });
};

exports.readById = (req, res) => {
  Cat.findByPk(req.params.catId)
    .then((cat) => res.status(200).json(cat))
    .catch((error) => {
      errorHandler(req, res, error);
    });
};

exports.update = (req, res) => {
  Cat.update(req.body, {
    where: { id: req.params.catId },
  })
    .then(([catsUpdated]) => res.status(200).send({ catsUpdated }))
    .catch((error) => {
      errorHandler(req, res, error);
    });
};

exports.destroy = (req, res) => {
  Cat.destroy({ where: { id: req.params.catId } })
    .then((catsDeleted) => res.status(200).send({ catsDeleted }))
    .catch((error) => {
      errorHandler(req, res, error);
    });
};
