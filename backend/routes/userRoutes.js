const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/users', userController.getUsers);
router.get('/user', userController.getUser);
router.get('/posts', userController.getUserPosts);
router.get('/status', userController.getUserStatus);
router.patch('/status', userController.updateUserStatus);
router.patch('/userUpdates/:email',userController.updateUserByEmail);
module.exports = router;
