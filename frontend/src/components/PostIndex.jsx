
// make a git request to the book/index
// display the books in a meaningful way
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Dropdown, User } from "@nextui-org/react";



export default function PostIndex() {

const [posts, setPosts] = useState([])


    useEffect(() => {
        getAllPosts()
    }, [])
        

const getAllPosts = async () => {
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
}

const handleDelete = async (postId) => {
    console.log(postId)
    const response = await axios.post(`post/delete?id=${postId}`)
    console.log(response)
    getAllPosts()
}
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
      getAllPosts();
    } catch (error) {
      console.error(error.response.data); // Log the error response data
    }

  }

const allPosts = posts.map((post, index) => {

return (
    <div className='post-box'>
     <User
      src="currentuser.pfp"
      name="Ariana Wattson"
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


        <div className='like-div'>
        <button className='like-btn' onClick={()=> {handleLikes(post._id)}}>Like</button>
        {/* <h5>{book.likes}</h5> */}
        </div>
        <div className="comment-section">
        <button className='comment-btn'></button>
        {/* <h5>{book.comments.count}</h5> */}
        </div>
        <div className="share">
        <button className='share-btn' img='frontend/public/logo192.png'></button>
        </div>

    <div key={index} className='book-div-index'>
        <img src={post.image.url} alt="" /> 



        
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
