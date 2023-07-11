const Post = require("../models/Post")
const User = require('../models/User');


// const upload = require("../utils/multer");

const cloudinary = require("../utils/cloudinary");
// // 
// // SET STORAGE
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//       }
//     });

//     // Create the multer instance
//     const upload = multer({ storage: storage });

exports.getPosts = async(req, res) => {
    try {
        const posts = await Post.find().populate('userId').populate('username').sort({createdAt: -1})
        const currentUser = req.user; 

        // res.render('Post/post', { posts, currentUser, post: {} });
        res.json(posts)
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve posts' });
        console.log(error.message);
    }
};

exports.createPost_post = async(req, res) => {
    // const {name, image } = req.body;
    try {
        if (!req.file || !req.file.path) {
            throw new Error('No file uploaded');
        }
        console.log("test ", req.user)
        const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'posts',
            })
            // Handle the result and send a response

        const newPost = {
            userId: req.user.id,
            name: req.body.name,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            }
        };
        //  await newPost.save();
        const post = await Post.create(newPost)
            // res.redirect('/posts');
        res.status(201).json({
            success: true,
            post,
        });
    } catch (error) {
        // Handle the error
        res.status(500).json({ error: 'An error occurred while uploading the image.' });
    }
};



exports.posts_delete = async(req, res) => {
    console.log(req.query.id);
    try {
        await Post.findByIdAndDelete(req.query.id);

        res.status(200).json({ message: 'Post Deleted' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Something Went Wrong!' });
    } finally {
        console.log('We are in the finally block');
    }
};
//   const { userId, caption } = req.body;
//   const image = req.file.filename;

//   try {
//     const post = new Post({ userId, image, caption });
//     await post.save();
//     const currentUser = req.user; // Assuming the current user is available in the request object
//     res.render('Post/post', { posts: [], currentUser, post });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create post' });
//   }
// };

exports.likePost = async(req, res) => {

    // try {
    //     const postId = req.params.postId;
    //     const userId = req.user.id;
    
    //     const post = await Post.findById(postId);
    //     if (!post) {
    //       return res.status(404).json({ error: 'Post not found' });
    //     }
    
    //     post.likes(userId);
    
    //     await post.save();
    // //         res.status(200).json({ message: 'Post liked successfully' });

    //     res.status(201).json({ message: 'Post liked successfully' });
    //   } catch (error) {
    //     res.status(500).json({ error: 'An error occurred while liking the post.' });
    //   }
    // };
    try {
        console.log('in like post')
        const postId = req.params.postId;
        const userId = req.user.id; // Assuming you have user authentication implemented
        const post = await Post.findByIdAndUpdate(postId,userId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
          }
    // await Post.findByIdAndUpdate(postId,userId)
        // Post.likes(userId);
    //     await post.save();
    // await post.likes(userId);

    // await post.save();

        res.status(200).json({ message: 'Post liked successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to like the post' });
    }
};
exports.unlikePost = async(req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.id;
        const post = await Post.findByIdAndUpdate(postId,userId);

        // const post = await Post.findByIdAndUpdate(postId,userId);
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
    //    await post.unlike(userId);

        // await post.save();
        // Post.unlike(userId);
    
        // await post.save();
    
        res.status(200).json({ message: 'Post Unliked successfully' });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while unliking the post.' });
      }
    };
    

//     try {
//         const postId = req.params.postId;
//         const userId = req.user.id; // Assuming you have user authentication implemented
//         await Post.unlike(postId, userId);
//         res.status(200).json({ message: 'Post unliked successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to unlike the post' });
//     }
// };
exports.getLikesCount = async(req, res) => {
    try {
        const postId = req.params.postId;
        const likesCount = await Post.getLikesCount(postId);
        res.status(200).json({ likesCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve likes count' });
    }
};

exports.deletePost = async (req, res) => {
    try {
      const postId = req.params.postId;
  
      const post = await Post.findByIdAndDelete(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
    //   await post.remove();
  
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while deleting the post." });
    }
  };
exports.addComment_post = async(req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.id;
        const { text } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        // Create the comment object
        const comment = {
            userId,
            text
        };

        // Add the comment to the comments array
        post.comments.push(comment);
        await post.save();

        res.status(201).json({ success: true, comment });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the comment.' });
    }
};



//  exports.creatPost_post = async (req, res) =>{
//   const newProduct = new productModel({
//     author: req.body.authorID,
//     title: req.body.title,
//     image: req.body.image,
//     description: req.body.description,
//     quantity: req.body.quantity,
//     price: req.body.price,
//   });
//   try {
//      const savedProduct = await newProduct.save();
//      res.status(200).json(savedProduct);
//    } catch (error) {
//      res.status(400).json({ message: "Error trying to post product!", error: error });
//    }
//  };