const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/otp', authController.sendOTP);
router.post('/verify', authController.verifyOTP);
router.post('/register', authController.registerUser);
router.get('/time',authController.checkTimeAndDevice);
router.get('/loggedInUser', authController.getLoggedInUser);
router.get('/userInfo', authController.getUserInfo);
router.get('/userStatus', authController.getUserStatus);
router.get('/userStat',authController.getUserStat);
module.exports = router;
