const express = require('express');
const { Cat } = require('./models');

const app = express();

// we expect to have to parse json from request bodies
app.use(express.json());

app.post('/cats', (req, res) => {
  Cat.create(req.body).then(cat => res.status(201).json(cat));
})

app.get('/cats', (req, res) => {
  Cat.findAll({ where: req.query }).then(cats => res.status(200).json(cats));
})

app.get('/cats/:catId', (req, res) => {
  Cat.findByPk(req.params.catId).then(cat => res.status(200).json(cat));
})

app.patch('/cats/:catId', (req, res) => {
  Cat.update(req.body, { where: { id: req.params.catId } }).then(() => res.status(201).send())
})

app.patch('/feed/:catId', (req, res) => {
  Cat.update({ lastFed: new Date() }, { where: { id: req.params.catId } }).then(() => res.status(201).send())
})

// we will put our routes and controller functions here

module.exports = app;