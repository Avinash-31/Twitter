const geoip = require('geoip-lite');
const requestIp = require('request-ip');

app.use(requestIp.mw());

const geoipMiddleware = (req, res, next) => {
  const ip = req.clientIp;
  req.geoip = geoip.lookup(ip);
  req.geoip = geo;
  next();
};

module.exports = geoipMiddleware;
