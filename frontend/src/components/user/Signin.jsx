import React from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import { useState } from 'react';



export default function Signin(props) {
    const [newUser, setNewUser] = useState({})
    const [forgotPassword, setForgotPassword] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

const changeHandler = (e) => {
    const user = {...newUser}
    user[e.target.name] = e.target.value
    console.log(user)
    setNewUser(user)
}
const loginHandler = (e) => {
    props.login(newUser)
  
}
const handleForgotPassword = () => {
  setForgotPassword(true);
};

const handleResetPassword = () => {
  // TODO: Implement the reset password logic
  setResetPassword(true);
};

const handlePasswordChange = (e) => {
  setPassword(e.target.value);
};

const handleConfirmPasswordChange = (e) => {
  setConfirmPassword(e.target.value);
};


return (
  <>
    <h1 className="sign-logo">Signin</h1>
    <div className="container">
      {forgotPassword ? (
        resetPassword ? (
          <>
            <h2>Reset Password</h2>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleResetPassword}>
              Reset Password
            </Button>
          </>
        ) : (
          <>
            <h2>Forgot Password</h2>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="emailAddress"
                onChange={changeHandler}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleResetPassword}>
              Submit
            </Button>
          </>
        )
      ) : (
        <>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-control" name="emailAddress" onChange={changeHandler} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-control" name="password" type="password" onChange={changeHandler} />
          </div>

          <button className="btn-primary" onClick={loginHandler}>
            Login
          </button>
          <Button variant="link" onClick={handleForgotPassword}>
            Forgot Password?
          </Button>
        </>
      )}
    </div>
  </>
);
}
