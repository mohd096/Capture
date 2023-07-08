
// // make a git request to the book/index
// // display the books in a meaningful way
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// // import { Dropdown, User } from "@nextui-org/react";



// export default function PostIndex() {

// const [posts, setPosts] = useState([])


//     useEffect(() => {
//         getAllPosts()
//     }, [])
        

// const getAllPosts = async () => {
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
// }

// const handleDelete = async (postId) => {
//     console.log(postId)
//     const response = await axios.post(`posts/delete?id=${postId}`)
//     console.log(response)
//     getAllPosts()
// }
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
//       getAllPosts();
//       for (let i = 0; i < posts.length; i++) {
//         await posts[i].populate('userId').execPopulate();
//         setPosts(posts);
//       }
//     } catch (error) {
//       console.error(error.response.data); // Log the error response data
//     }

//   }

// const allPosts = posts.map((post, index) => {

// return (
//     <div className='post-box'>
//      {/* <User
//       src="currentuser.pfp"
//       name="Ariana Wattson"
//       className='user-pfp'
//       zoomed
//       pointer
//       css={{
//         zindex: -1,
//       }}
//     />; */}

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

// <p>Posted by {post.userId.username} ({post.userId.name})</p>

//         <div className='like-div'>
//         <button className='like-btn' onClick={()=> {handleLikes(post._id)}}>Like</button>
//         {/* <h5>{book.likes}</h5> */}
//         </div>
//         <div className="comment-section">
//         <button className='comment-btn'></button>
//         {/* <h5>{book.comments.count}</h5> */}
//         </div>
//         <div className="share">
//         <button className='share-btn' img='frontend/public/logo192.png'></button>
//         </div>

//     <div key={index} className='post-div-index'>
//         <img src={post.image.url} alt="" className='post-img' /> 



        
//         <button className='book-del-btn' onClick={()=> {handleDelete(post._id)}}>Delete</button>
       

//     </div>
//     </div>
// )


// })


//   return (
// <>

//     {allPosts}
//     </>
//   )

// }










import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, User  } from "@nextui-org/react";
import { HeartIcon } from './imported/HeartIcon';
import { UserIcon } from './imported/UserIcon';


const PostIndex = () => {
  const [posts, setPosts] = useState([]);

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
    try {
      const response = await axios.post(`posts/${postId}/like`, {}, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });
      console.log(response.data); // Log the response data for debugging
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
  {/* <a href={`/user/${post.userId._id}`}>{post.userId.userName}</a> */}
          
  
     <User
      src={post.userId.pfp}
      name={<a href={`/user/${post.userId._id}`}>{post.userId.firstName}</a>}
      zoomed
      pointer  
      >
      <User.Link href={`/user/${post.userId._id}`}>@{post.userId.userName}</User.Link>
    </User> 
    
          
          
          
          
          <div className='post-div-index'>
            <img src={post.image.url} alt="" className='post-img' onClick={() => { handlePostSelect(post) }} />
            
            <h3>{post.name}</h3>
            <button className='book-del-btn' onClick={() => { handleDelete(post._id) }}> <img src='/assets/Delete.svg'></img> </button>
            <div className='like-div'>
          <Button
          auto
          color="gradient"
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