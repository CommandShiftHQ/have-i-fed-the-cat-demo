module.exports = (req, message) => {
  const { method, url } = req;
  const dateTime = new Date().toISOString();

  return `[${dateTime}] ${method}:${url} ${message || ''}`;
};
