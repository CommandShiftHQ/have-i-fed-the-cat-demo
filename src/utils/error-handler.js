const Sequelize = require('sequelize');
const buildLogMessage = require('./build-log-message');
const { logError } = require('./logger');

module.exports = (req, res, error) => {
  if (error instanceof Sequelize.ValidationError) {
    const errorMessages = error.errors.map((e) => e.message);
    logError(buildLogMessage(req, errorMessages.join(', ')));
    res.status(400).json({ error: errorMessages });
  } else {
    logError(buildLogMessage(req, error.message));
    res.status(500).json({ error: error.message });
  }
};
