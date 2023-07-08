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



  return (<>
    <h1 className="sign-logo">Signin</h1>
    <div className="container">
  
      <div className="form-group">
        <label className="form-label">Email</label>
        <input className="form-control" name="emailAddress" onChange={changeHandler} />
      </div>
      <div className="form-group">
        <label className="form-label">Password</label>
        <input className="form-control" name="password" type="password"onChange={changeHandler} />
      </div>
  
      <button className="btn-primary" onClick={loginHandler}>
        Login
      </button>
  
    </div>
  </>
  )
}
