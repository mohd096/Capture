// import React, { useState } from 'react'
// import axios from 'axios'

// export default function PostCreate(){

//     const [post, setpost] = useState({})
//     const [userMessage, setUserMessage] = useState('')
    

//     const handleChange = (event) => {
//         const attribute = event.target.name
//         const value = event.target.value
//         console.log(attribute, value)

//         const currentpost = {...post}
//         currentpost[attribute] = value
//         setpost(currentpost)
//         console.log(post)
//     }

//     const handleSubmit = async (event) => {
//         event.preventDefault()

//         const response = await axios.post('posts', post)
//         console.log(response)

//         if (response.status === 201){
//             setUserMessage('Your post Has Been Added')
//         } else {
//             setUserMessage('Something Went Wrong')
//         }
//     }




import React, { Component } from 'react';
import axios from 'axios';

export default class PostCreate extends Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      image: ''
    }
  }

  onFileChange(e) {
    this.setState({ image: e.target.files[0] })
  }

  onSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', this.state.image)
    axios.post("posts", formData, {
      headers : {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create New Post</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input type="file" onChange={this.onFileChange} />
          </div>
          <div className="form-group">
            <input type="submit" value="Upload" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
//     return (
//         <div>
//             <h1>Create post!</h1>

//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Img</label>
//                     <input
//                         type='file'
//                         name="image"
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label>Caption</label>
//                     <input
//                         type="text"
//                         name="caption"
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                 <input 
//                 type="submit"
//                 value="Add Post"
//                 />
//                 </div>
//             </form>
//             <p>{userMessage}</p>
//         </div>
//     )
// }