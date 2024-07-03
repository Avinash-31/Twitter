const express = require('express');
const geoip = require('geoip-lite');
const requestIp = require('request-ip');
const app = express();

app.use(requestIp.mw());

const geoipMiddleware = (req, res, next) => {
  const ip = req.clientIp;
  const geo = geoip.lookup(ip);
  req.geoip = geo;
  next();
};

module.exports = geoipMiddleware;
