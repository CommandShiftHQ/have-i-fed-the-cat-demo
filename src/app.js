const express = require('express');
const catRouter = require('./routes/cats')
const feedRouter = require('./routes/feed')

const app = express();

app.use(express.json());

app.use('/cats', catRouter)
app.use('/feed', feedRouter)

module.exports = app;
