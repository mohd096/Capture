import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, User  } from "@nextui-org/react";
import { HeartIcon } from './imported/HeartIcon';
import { UserIcon } from './imported/UserIcon';


const PostIndex = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);


  const getAllPosts = async () => {
    try {
      const response = await axios.get('posts', {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        params: {
          populate: 'userId'
        }
      });
      console.log(response.data); // Log the response data for debugging
      const posts = response.data;
      setPosts(posts);
    } catch (error) {
      console.log(error.message);
      // Handle the error here
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleLikes = async (postId) => {
    console.log(postId)
    console.log('token: ', localStorage.getItem("token"))

    try {
      const response = await axios.post(`posts/${postId}/like`, {}, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
        
      });
      console.log(response.data); // Log the response data for debugging
      setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
      getAllPosts();
    } catch (error) {
      console.log('Error liking post:', error);
    }

  }
  const handleUnlike = async (postId) => {
    console.log('token: ', localStorage.getItem("token"))
    try {
      const response = await axios.post(`posts/${postId}/unlike`, {}, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
        
      });
      console.log(response.data); // Log the response data for debugging

      setLikedPosts((prevLikedPosts) =>
        prevLikedPosts.filter((id) => id !== postId)
      );
    } catch (error) {
      console.log('Error unliking post:', error);
    }
  };
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return response.data;
        } else {
          return post;
        }
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.log(error.message);
      // Handle the error here
    }
  }
  const handlePostSelect = (post) => {
    console.log(post);
    // Handle the post selection here
  }
  const handleShowCommentInput = () => {
    setShowCommentInput(true);
  };
  
  const handleHideCommentInput = () => {
    setShowCommentInput(false);
  };
  
  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleAddComment = async (postId) => {
    try {
      const response = await axios.post(`posts/${postId}/comments`, {
        text: commentText
      }, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });

      console.log(response.data); // Log the response data for debugging
      setCommentText('');
      getAllPosts();
    } catch (error) {
      console.log('Error adding comment:', error);
    }
  };
  const handleShare = (postId) => {
    const postUrl = `${window.location.origin}/posts/${postId}`; 
    navigator.clipboard.writeText(postUrl); 
    console.log(postUrl,"Post URL Copied to clipboard")
  };

const handleDelete = async (postId) => {
  try {
    console.log(postId)
    const response = await axios.post(`posts/${postId}/delete`, {}, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
      
    });
    console.log(response)
    getAllPosts()
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

    const allPosts = posts.map((post) => {
      const isLiked = likedPosts.includes(post._id);
      const likesCount = post.likes.length;
console.log(post.userId.firstName)
console.log("post", post)
  

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(`posts/delete/id=${postId}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });
      console.log(response.data); // Log the response data for debugging
      // const updatedPosts = posts.filter((post) => post._id !== postId);
      const updatedPosts = posts.filter((post) => post._id !== postId);
      setPosts(updatedPosts);
      // setPosts(updatedPosts);
    } catch (error) {
      console.log(error.message);
      // Handle the error here
    }
  }

    const allPosts = posts.map((post) => {
      return (
        <div className='post-box' key={post._id}>
          
  
     <User
      src={post.userId && post.userId.pfp?.url}
      name={<a href={`/user/${post.userId}`}>{post.userId.firstName}</a>}
      zoomed
      pointer  
      >
      <User.Link href={`/user/${post.userId}`}>@{post.userId.userName}</User.Link>

    
          
          
          
          
          <div className='post-div-index'>
            <img src={post.image.url} alt="" className='post-img' onClick={() => { handlePostSelect(post) }} />
            
            <h3>{post.name}</h3>
            <button className='book-del-btn' onClick={() => { handleDelete(post._id) }}> <img src='/assets/Delete.svg' alt='Delete'></img> </button>

            <div className='like-div'>
          <Button
          auto
          color="gradient"
          onClick={isLiked ? () => handleUnlike(post._id) : () => handleLikes(post._id)}
          icon={<HeartIcon fill="currentColor"  />}
          >{isLiked ? 'Unlike' : 'Like'}</Button>
          <span>{likesCount} </span>
          
          </div>
          
          <div className="comment-section">
            {showCommentInput ? (
              <>
                <input type="text" value={commentText} onChange={handleCommentChange} />
                <button className="comment-send-btn" onClick={() => handleAddComment(post._id)}>
                  Send
                </button>
                <button className="comment-cancel-btn" onClick={handleHideCommentInput}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="comment-btn" onClick={handleShowCommentInput}>
                <img src={'/assets/comment.svg'} alt='comment'></img>
              </button>
            )}
            {post.comments.map((comment) => (
              <div key={comment._id} className="comment">
                <span className="comment-username">{comment.userId.userName}:</span>
                <span className="comment-text">{comment.text}</span>
              </div>
            ))}
          </div>
          
          
<div className="share">
  <button className="share-btn" onClick={() => handleShare(post._id)}>
    <img src={'/assets/share.svg'} alt='Share'></img>
  </button>
</div>
          onClick={() => { handleLikes(post._id) }}
          icon={<HeartIcon fill="currentColor"  />}
          />
          
          
          </div>
          <div className="comment-section">
            <button className='comment-btn'><img src={'/assets/comment.svg'}></img></button>
          </div>
          
          
          <div className="share">
            <button className='share-btn' ><img src={'/assets/share.svg'}></img></button>
          </div>
           
            {/* <Button icon={<UserIcon fill="currentColor" />} color="error" flat>
          Delete User
        </Button>
        <Button icon={<UserIcon />} disabled>
          Delete User
        </Button> */}
          </div>
        </div>
      )
    })

  return (
    <div className='post-index'>
      {allPosts}
    </div>
  )
}

export default PostIndex;
