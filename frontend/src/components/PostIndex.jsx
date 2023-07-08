import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  User } from "@nextui-org/react";



export default function PostIndex({ currentUser }) {

const [posts, setPosts] = useState([])
const [likedPosts, setLikedPosts] = useState([]);
    useEffect(() => {
        getAllPosts()
    }, [])
        

const getAllPosts = async () => {
  try {
  console.log('in get all posts')
    const response = await axios.get('posts', 
    {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
)
console.log(response)
setPosts(response.data)
} catch (error) {
  console.error('Error fetching posts:', error);
}
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
  

const allPosts = posts.map((post, index) => {
  const isLiked = likedPosts.includes(post._id);
  const likesCount = post.likes.length;

return (
    <div className='post-box' key={post._id}>
     <User
      src='{currentUser.pfp.url}'
      name='{currentUser.userName}'
      zoomed
      pointer   
    />;

        {/* <Dropdown>
      <Dropdown.Button flat>...</Dropdown.Button>
      <Dropdown.Menu aria-label="Static Actions">
        <Dropdown.Item key="new">test</Dropdown.Item>
        <Dropdown.Item key="copy">Copy link</Dropdown.Item>
        <Dropdown.Item key="edit">Edit file</Dropdown.Item>
        <Dropdown.Item key="delete" color="error">
          Delete file
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> */}



        <div className="comment-section">
        <button className='comment-btn'></button>
        </div>
        <div className="share">
        <button className='share-btn' img='frontend/public/logo192.png'></button>
        </div>

    <div key={index} className='book-div-index'>
        <img src={post.image.url} alt="" /> 


        <div className='like-div'>
        <button className='like-btn' onClick={isLiked ? () => handleUnlike(post._id) : () => handleLikes(post._id)}
>
        {isLiked ? 'Unlike' : 'Like'}
      </button>
      <span>{likesCount} likes</span>
        </div>
        
        <button className='book-del-btn' onClick={()=> {handleDelete(post._id)}}>Delete</button>
       

    </div>
    </div>
)


})


  return (
<>

    {allPosts}
    </>
  )

}
