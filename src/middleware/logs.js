const { logInfo } = require('../utils/logger');
const buildLogMessage = require('../utils/build-log-message');

module.exports = (req, _, next) => {
  logInfo(buildLogMessage(req));
  next();
};
