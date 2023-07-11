// models/Post.js
const mongoose = require('mongoose')
const  Likes  = require('mongoose-likes');


const postSchema = mongoose.Schema({
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
    comments: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comment: {
            type: String,
        }
    }],
    likes: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        like: {
            type: String,
           
        }
    }]
}, {
    timestamps: true
})

postSchema.virtual('username', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
})

postSchema.plugin(Likes);

const Post = mongoose.model('Post', postSchema)

module.exports = Post