const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.get('Authorization');
  jwt.verify(token, process.env.JWT_SECRET, (error, authorizer) => {
    if (!error) {
      req.authorizer = authorizer;
      next();
    } else {
      res.status(401).json({ error: error.message });
    }
  });
};

module.exports = auth;