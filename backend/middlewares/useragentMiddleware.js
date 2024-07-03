const useragent = require('express-useragent');

const useragentMiddleware = (req, res, next) => {
  req.useragent = useragent.parse(req.headers['user-agent']);
  next();
};

module.exports = useragentMiddleware;
