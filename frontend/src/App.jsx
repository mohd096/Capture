import {BrowserRouter as Router, Route,Routes, Link, Navigate} from 'react-router-dom';
import React from 'react'
import Signin from './components/user/Signin';
import Signup from './components/user/Signup';
import PostIndex from './components/PostIndex'
import styles from './App.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import PostCreate from './components/PostCreate';
import Profile from './components/user/Profile';





export default function App() {
    
    // const navigate = useNavigate(); 
    //  const Navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);//check if user is authenticated
    const [user, setUser] =useState({});//user object

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token != null) {
            let user = jwt_decode(token);
            if (user) {
                setIsAuth(true);
                setUser(user);
                } else {
                localStorage.remove("token");
                setIsAuth(false);

                }
    }
    }, [isAuth])




    const registerHandler = (user) => {
        axios.post("auth/signup", user)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })

    }
    const loginHandler = (cred) => {
        
        axios.post("auth/signin", cred)
        .then((res) => {
            console.log(res.data.token)
            let token = res.data.token;
            if (token != null) {
                localStorage.setItem("token", token);
                let user = jwt_decode(token);
                setIsAuth(true);
                setUser(user);
                window.location.pathname = '/'     
                   }
                
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const logoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setIsAuth(false);
        setUser(null);
    }







return (
    <>
           <Router >     
           <nav>
  <div className="navbar">
    <a className='title' href="/">capture</a>
    {isAuth ? null : (
      <>
        <Link to="/signin">Signin</Link>&nbsp;
        <Link to="/signup">Signup</Link>&nbsp;
        
      </>
    )}
    {isAuth && <Link to="/logout" onClick={logoutHandler}>Logout</Link> }
    {isAuth && <Link to="/profile">Profile</Link> }
    <Link to="/create-post">Create +</Link>&nbsp;
  </div>
</nav>
            <Routes>
                <Route
                path="/"
                element={<PostIndex />}
                />


                {/* this is the route that will be protected 
                <Route
                path="/books"
                element={isAuth ? <BookIndex />:<Signin login={loginHandler}></Signin>}
                /> */}
                <Route
                path="/profile"
                element={isAuth ? <Profile user={user} />:<Signin login={loginHandler}></Signin>}
                /> 


                <Route
                path="/signin"
                element={<Signin login={loginHandler}></Signin>}
                />
                <Route
                path="/signup"
                element={<Signup register={registerHandler}></Signup>}
                />
                <Route 
                path="/create-post"
                element={isAuth ? <PostCreate />:<Signin login={loginHandler}></Signin>}
                />
            </Routes>
      <div className="wrapper">
        <div className='side-navbar'>
            <div className="side-bar-content">
            <Link className='side-nav-links' to="/">Explore</Link>

                 <h3>Following</h3>
            <p>Log in to follow creators, like posts, create posts and more.</p>
            <button className='side-nav-btn'>Log in</button>
            </div>
           
        </div>
        </div>
        </Router>

    </>
)}
