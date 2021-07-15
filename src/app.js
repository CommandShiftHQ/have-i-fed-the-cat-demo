const express = require('express');
const logs = require('./middleware/logs');
const catRouter = require('./routes/cat');

const app = express();

app.use(express.json());

app.use(logs);
app.use('/cats', catRouter);

module.exports = app;
