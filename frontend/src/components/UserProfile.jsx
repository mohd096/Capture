  import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className='user-profile'>
      {user && (
        <>
          <h2>{user.firstName}</h2>
          <p>{user.emailAddress}</p>
          <p>{user.bio}</p>
        </>
      )}
    </div>
  )
}

export default UserProfile;
