const catRepository = require('../repository/cats')

const { Cat } = require('../models')

exports.create = (req, res) => {
  catRepository.createCat(req.body).then((cat) => res.status(201).json(cat));
}

exports.getAll = (req, res) => {
  catRepository.listCats(req.query).then((cats) => res.status(200).json({ cats }));
}

exports.getById = (req, res) => {
  catRepository.findCat(req.params.catId).then((cat) => res.status(200).json(cat));
}

exports.update = (req, res) => {
  catRepository.updateCat(req.params.catId, req.body).then((ok) => {
    if (ok) {
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  });
}

exports.feed = (req, res) => {
  catRepository.feedCat(req.params.id).then(() => res.status(200).send());
}

exports.delete = (req, res) => {
  catRepository.deleteCat(req.params.catId).then(ok => {
    if (ok) {
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  });
}