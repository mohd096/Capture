
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



const allPosts = posts.map((post, index) => {

return (
    <div className='post-box'>
     
     <User
      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
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
        <button className='like-btn'></button>
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
        <h3>{post.image.url}</h3>

    
        
        <button className='book-del-btn' onClick={()=> {handleDelete(post._id)}}></button>
       

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
