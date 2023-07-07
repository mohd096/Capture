const mongoose = require('mongoose');
const  Likes  = require('mongoose-likes');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
  },
  image: {
    public_id: {
    type: String,
    required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      text: {
        type: String,
        required: true
      }
    }
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});
postSchema.plugin(Likes);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
