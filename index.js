const app = require('./src/app');
const { logInfo } = require('./src/utils/logger');

app.listen(3000, () => {
  logInfo('app is listening on localhost:3000');
});
