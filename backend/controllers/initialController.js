exports.check = (req, res) => {
    const userInfo =
    {
        browser: req.useragent.browser,
        os: req.useragent.os,
        device: req.useragent.isDesktop ? "Desktop" : req.useragent.isMobile ? "Mobile" : "Tablet",
        ip: req.clientIp,
        geo: req.geoip,
        loginTime: new Date(),
    }
    console.log(`${(1720277102).format("DD-MM-YYYY")}`);
    res.send(userInfo);
};