import React, { useState } from 'react'
import axios from 'axios'

export default function PostCreate(){

    const [post, setpost] = useState({})
    const [userMessage, setUserMessage] = useState('')
    

    const handleChange = (event) => {
        const attribute = event.target.name
        const value = event.target.value
        console.log(attribute, value)

        const currentpost = {...post}
        
        currentpost[attribute] = value
        
        setpost(currentpost)
        console.log(post)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const response = await axios.post('post/add', post)
        console.log(response)

        if (response.status === 201){
            setUserMessage('Your post Has Been Added')
        } else {
            setUserMessage('Something Went Wrong')
        }
    }

    return (
        <div>
            <h1>Create post!</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Img</label>
                    <input
                        type='image'
                        name="title"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Caption</label>
                    <input
                        type="text"
                        name="caption"
                        onChange={handleChange}
                    />
                </div>
               
            </form>
            <p>{userMessage}</p>
        </div>
    )
}