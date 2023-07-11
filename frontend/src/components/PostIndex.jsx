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

  // const find = (selector) => {
  //   const element = document.querySelector(selector);
  //   if (element && element.currentSrc) {
  //     return element.currentSrc;
  //   } else {
  //     return null;
  //   }
  // }

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
      return (
        <div className='post-box' key={post._id}>
  {/* <a href={`/user/${post.userId._id}`}>{post.userId.userName}</a> */}
          
  
     <User
      src={post.userId && post.userId.pfp?.url}
      name={<a href={`/user/${post.userId}`}>{post.userId.firstName}</a>}
      zoomed
      pointer  
      >
      <User.Link href={`/user/${post.userId}`}>@{post.userId.userName}</User.Link>
    </User> 
    
          
          
          
          
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
// // make a git request to the book/index
// // display the books in a meaningful way
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import {  User } from "@nextui-org/react";
// import { Button, User  } from "@nextui-org/react";
// import { HeartIcon } from './imported/HeartIcon';
// import { UserIcon } from './imported/UserIcon';


// export default function PostIndex() {

// const [posts, setPosts] = useState([])
// const [likedPosts, setLikedPosts] = useState([]);

//     useEffect(() => {
//         getAllPosts()
//     }, [])
        

// const getAllPosts = async () => {
//   try {
//   console.log('in get all posts')
//     const response = await axios.get('posts', 
//     {
//         headers: {
//             "Authorization": "Bearer " + localStorage.getItem("token")
//         }
//     }
// )
// console.log(response)
// setPosts(response.data)
// } catch (error) {
//   console.error('Error fetching posts:', error);
// }
// };

// const handleDelete = async (postId) => {
//   try {
//     console.log(postId)
//     const response = await axios.post(`posts/${postId}/delete`, {}, {
//       headers: {
//         "Authorization": "Bearer " + localStorage.getItem("token")
//       }

//     });
//     console.log(response)
//     getAllPosts()

//   } catch (error) {
//     console.error('Error deleting post:', error);
//   }
// };


// const handleLikes = async (postId) => {
//     console.log(postId)
//     console.log('token: ', localStorage.getItem("token"))
//     try {
//       const response = await axios.post(`posts/${postId}/like`, {}, {
//         headers: {
//           "Authorization": "Bearer " + localStorage.getItem("token")
//         }
        
//       });
    
//       console.log(response.data); // Log the response data for debugging
//       setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
//       getAllPosts();
//     } catch (error) {
//       console.log('Error liking post:', error);
//     }

//   }

//   const handleUnlike = async (postId) => {
//     console.log('token: ', localStorage.getItem("token"))
//     try {
//       const response = await axios.post(`posts/${postId}/unlike`, {}, {
//         headers: {
//           "Authorization": "Bearer " + localStorage.getItem("token")
//         }

//       });
//       console.log(response.data); // Log the response data for debugging

//       setLikedPosts((prevLikedPosts) =>
//         prevLikedPosts.filter((id) => id !== postId)
//       );
//     } catch (error) {
//       console.log('Error unliking post:', error);
//     }
//   };

// const allPosts = posts.map((post, index) => {
//   const isLiked = likedPosts.includes(post._id);
//   const likesCount = post.likes.length;
// return (
//     <div className='post-box' key={post._id}>
//      <User
//       src='{currentUser.pfp.url}'
//       name='{currentUser.userName}'
//       zoomed
//       pointer   
//     />;

//         {/* <Dropdown>
//       <Dropdown.Button flat>...</Dropdown.Button>
//       <Dropdown.Menu aria-label="Static Actions">
//         <Dropdown.Item key="new">test</Dropdown.Item>
//         <Dropdown.Item key="copy">Copy link</Dropdown.Item>
//         <Dropdown.Item key="edit">Edit file</Dropdown.Item>
//         <Dropdown.Item key="delete" color="error">
//           Delete file
//         </Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown> */}



//         <div className="comment-section">
//         <button className='comment-btn'></button>
//         </div>
//         <div className="share">
//         <button className='share-btn' img='frontend/public/logo192.png'></button>
//         </div>

//     <div key={index} className='book-div-index'>
//         <img src={post.image.url} alt="" /> 


//         <div className='like-div'>
//         <button className='like-btn' onClick={isLiked ? () => handleUnlike(post._id) : () => handleLikes(post._id)}>
//         {isLiked ? 'Unlike' : 'Like'}
//       </button>
//       <span>{likesCount} likes</span>
//         </div>
        
        
//         <button className='book-del-btn' onClick={()=> {handleDelete(post._id)}}>Delete</button>
//       </div>

//     </div>
// )


// })


//   return (
// <>

//     {allPosts}
//     </>
//   )

// }
