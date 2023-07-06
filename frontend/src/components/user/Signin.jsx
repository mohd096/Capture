import React from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import { useState } from 'react';



export default function Signin(props) {


    const [newUser, setNewUser] = useState({})
const changeHandler = (e) => {
    const user = {...newUser}
    user[e.target.name] = e.target.value
    console.log(user)
    setNewUser(user)
}
const loginHandler = (e) => {
    props.login(newUser)
  
}



  return (
    <>
    <h1 className="sign-logo">Signin</h1>
    <Container>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control name="emailAddress" onChange={changeHandler}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" onChange={changeHandler}></Form.Control>
      </Form.Group>

      <Button onClick={loginHandler} 
      variant="primary">
        Login
      </Button>

    </Container>
    
  </>
  )
}
