const { Cat } = require('../models')

exports.create = (req, res) => {
  Cat.create(req.body).then((cat) => res.status(201).json(cat));
}

exports.getAll = (req, res) => {
  Cat.findAll({ where: req.query }).then((cats) =>
    res.status(200).json({ cats })
  );
}

exports.getById = (req, res) => {
  Cat.findByPk(req.params.catId).then((cat) => res.status(200).json(cat));
}

exports.update = (req, res) => {
  Cat.update(req.body, {
    where: { id: req.params.catId },
  }).then(([catsUpdated]) => res.status(200).send({ catsUpdated }));
}

exports.feed = (req, res) => {
  Cat.update(
    { lastFed: new Date() },
    { where: { id: req.params.catId } }
  ).then(() => res.status(200).send());
}

exports.delete = (req, res) => {
  Cat.destroy(
    { where: { id: req.params.catId } }
  ).then(catsDeleted => res.status(200).send({ catsDeleted }));
}