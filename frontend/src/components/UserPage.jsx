import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await axios.get(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        params: {
          fields: 'name,username,emailAddress'
        }

      });
      console.log(response.data);
      const user = response.data;
      setUser(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className='user-profile'>
      {user && (
        <>
          <h2>{user.name}</h2>
          <p>{user.username}</p>
          <p>{user.emailAddress}</p>
        </>
      )}
    </div>
  );
}

export default UserProfile;