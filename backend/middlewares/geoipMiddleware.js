const geoip = require('geoip-lite');

const geoipMiddleware = (req, res, next) => {
  const ip = req.clientIp;
  req.geoip = geoip.lookup(ip);
  next();
};

module.exports = geoipMiddleware;
