const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router.get('/posts', postController.getAllPosts);
router.post('/post', postController.createPost);
router.patch('/post/:id/upvote', postController.upvotePost);
router.patch('/post/:id/deupvote', postController.deupvotePost);
router.patch('/post/:id/like', postController.likePost);
router.patch('/post/:id/dislike', postController.dislikePost);

module.exports = router;
