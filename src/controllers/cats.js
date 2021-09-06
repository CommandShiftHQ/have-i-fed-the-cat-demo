const catRepository = require('../repository/cats')

exports.create = (req, res) => {
  const { body } = req
  catRepository.createCat(body).then((cat) => res.status(201).json(cat)).catch(err => res.status(500).json(err));
}

exports.getAll = (req, res) => {
  const { query } = req
  catRepository.listCats(query).then((cats) => res.status(200).json({ cats }));
}

exports.getById = (req, res) => {
  const { params: { catId } } = req
  catRepository.findCat(catId).then((cat) => res.status(200).json(cat));
}

exports.update = (req, res) => {
  const { body, params: { catId } } = req
  catRepository.updateCat(catId, body).then((ok) => {
    if (ok) {
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  });
}

exports.feed = (req, res) => {
  const { params: { catId } } = req
  catRepository.feedCat(catId).then(ok => {
    if (ok) {
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  });
}

exports.delete = (req, res) => {
  const { params: { catId } } = req
  catRepository.deleteCat(catId).then(ok => {
    if (ok) {
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  });
}