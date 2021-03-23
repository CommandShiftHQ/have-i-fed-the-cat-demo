const { Cat } = require("../models");
const uploadFile = require("../services/upload-file");

exports.create = (req, res) => {
  const catData = req.body;
  catData.ownerId = req.authorizer.id

  uploadFile(req.file)
        .then((imageUrl) => {
            req.body.imageUrl = imageUrl;
            return Cat.create(req.body);
        })
        .then((cat) => res.status(201).json(cat))
        .catch(error => {
            res.status(500).json({ error: error })
        })
}

exports.find = (req, res) => {
  Cat.findAll({ where: { ownerId: req.authorizer.id }}).then((cats) => {
    console.log(cats)
    res.status(200).json({ cats })
  });
}

exports.get = (req, res) => {
  Cat.findByPk(req.params.catId).then((cat) => res.status(200).json(cat));
}

exports.update = (req, res) => {
  Cat.update(req.body, {
    where: { id: req.params.catId },
  }).then(([catsUpdated]) => res.status(201).send({ catsUpdated }));
}

exports.delete = (req, res) => {
  Cat.destroy(
    { where: { id: req.params.catId } }
  ).then(catsDeleted => res.status(201).send({ catsDeleted }));
}