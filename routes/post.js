const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const postController = require("../controllers/post");



router.get('/posts', postController.getPosts);
router.post('/posts', upload.single('image'), postController.createPost_post)
router.post('/posts/:Id/comments', postController.addComment_post)
// router.post('/posts/:Id/like', postController.likePost_post)
// router.post('/posts', cloudinaryMiddleware.creatPost_post)
router.post('/posts/:postId/like', postController.likePost);
router.post('/posts/:postId/unlike', postController.unlikePost);
router.get('/posts/:postId/likes', postController.getLikesCount);




module.exports = router;