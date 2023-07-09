const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const postController = require("../controllers/post");

const isLoggedIn = require("../lib/isLoggedIn")



router.get('/posts', postController.getPosts);
router.post('/posts', upload.single('image'), isLoggedIn, postController.createPost_post)
router.post('/posts/:postId/comments', isLoggedIn, postController.addComment_post)
    // router.post('/posts/:Id/like', postController.likePost_post)
    // router.post('/posts', cloudinaryMiddleware.creatPost_post)
router.post('/posts/:postId/like', isLoggedIn, postController.likePost);
router.post('/posts/:postId/unlike',isLoggedIn, postController.unlikePost);
router.get('/posts/:postId/likes',isLoggedIn, postController.getLikesCount);
router.post('/posts/:postId/delete',isLoggedIn, postController.deletePost);




module.exports = router;