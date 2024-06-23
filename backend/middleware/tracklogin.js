// middleware/trackLogin.js
const useragent = require('useragent');
const geoip = require('geoip-lite');

module.exports = (req, res, next) => {
    const agent = useragent.parse(req.headers['user-agent']);
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip);

    req.loginInfo = {
        browser: agent.toAgent(),
        os: agent.os.toString(),
        device: agent.device.toString(),
        ip: ip,
        location: geo
    };

    next();
};
