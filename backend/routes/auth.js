// routes/auth.js
const express = require('express');
const router = express.Router();
const trackLogin = require('../middleware/tracklogin');

router.post('/login', trackLogin, async (req, res) => {
    // your login logic here
    // ...
    res.json({ message: 'Logged in successfully' });
    const loginInfo = req.loginInfo;
    // Save loginInfo to the database
    // ...
    res.send('Login information tracked');
});

module.exports = router;
