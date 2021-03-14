const express = require('express');
const { Cat } = require('./models');

const app = express();

app.use(express.json());

app.post("/cats", (req, res) => {
  Cat.create(req.body).then((cat) => res.status(201).json(cat));
});

app.get("/cats", (req, res) => {
  Cat.findAll({ where: req.query }).then((cats) =>
    res.status(200).json({ cats })
  );
});

app.get("/cats/:catId", (req, res) => {
  Cat.findByPk(req.params.catId).then((cat) => res.status(200).json(cat));
});

app.patch("/cats/:catId", (req, res) => {
  Cat.update(req.body, {
    where: { id: req.params.catId },
  }).then(([catsUpdated]) => res.status(201).send({ catsUpdated }));
});

app.patch("/feed/:catId", (req, res) => {
  Cat.update(
    { lastFed: new Date() },
    { where: { id: req.params.catId } }
  ).then(() => res.status(201).send());
});

app.delete("/cats/:catId", (req, res) => {
  Cat.destroy(
    { where: { id: req.params.catId } }
  ).then(catsDeleted => res.status(201).send({ catsDeleted }));
});

module.exports = app;
