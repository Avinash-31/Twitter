const express = require('express');
const initialController = require('../controllers/initialController');
const router = express.Router();
const path = require('path');


router.get('/', initialController.check);


module.exports = router;