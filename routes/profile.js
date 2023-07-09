const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile')
const isLoggedIn = require('../lib/isLoggedIn')


// Call Our API
// router.get('/user/edit', isLoggedIn, userController.user_edit_get)
// router.post('/user/edit', isLoggedIn, userController.user_edit_post)
// router.get('/user/index', userController.user_index_get)
// router.get('/user/:id', userController.user_Profile_Get)


// Get user profile
router.get('/profile',isLoggedIn, profileController.getUserProfile);

// Edit user profile
router.post('/profile/:userId/',isLoggedIn, profileController.editUserProfile);

module.exports = router;


