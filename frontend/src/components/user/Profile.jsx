// import React, { useState } from 'react';

// function Profile(props) {
//   const { name: initialName, bio: initialBio } = props;
//   const [name, setName] = useState(initialName);
//   const [bio, setBio] = useState(initialBio);
//   const [image, setImage] = useState("");
//   const [editing, setEditing] = useState(false);
//   const [following, setFollowing] = useState(0);
//   const [followers, setFollowers] = useState(0);
//   const [posts, setPosts] = useState([]);

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleBioChange = (event) => {
//     setBio(event.target.value);
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       setImage(e.target.result);
//     };

//     reader.readAsDataURL(file);
//   };

//   const handleEdit = () => {
//     setEditing(true);
//   };

//   const handleSave = () => {
//     // TODO: Update the user's profile with the new name, bio, and image
//     setEditing(false);
//   };

//   const handleFollow = () => {
//     setFollowing(following + 1);
//   };

//   const handleUnfollow = () => {
//     setFollowing(Math.max(following - 1, 0));
//   };

//   const handlePostUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const newPost = {
//         image: e.target.result,
//         caption: "",
//       };
//       setPosts([...posts, newPost]);
//     };

//     reader.readAsDataURL(file);
//   };

//   const handleRemovePost = (index) => {
//     const newPosts = [...posts];
//     newPosts.splice(index, 1);
//     setPosts(newPosts);
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-image-container">
//         <img className="profile-image" src={image} alt="Profile Picture" />
//         <input type="file" onChange={handleImageChange} />
//       </div>
//       <div className="profile-info-container">
//         <div className="profile-header">
//           <h1>{name}</h1>
//           {editing ? (
//             <div>
//               <label>
//                 Username:
//                 <input type="text" name="userName" value={name} onChange={handleNameChange} />
//               </label>
//               <label>
//                 Bio:
//                 <input type="text"  name="bio" value={bio} onChange={handleBioChange} />
//               </label>
//               <button onClick={handleSave}>Save</button>
//             </div>
//           ) : (
//             <div>
//               <p>{bio}</p>
//               <button onClick={handleEdit}>Edit Profile</button>
//             </div>
//           )}
//         </div>
//         <div className="profile-stats">
//           <div className="profile-stat">
//             <p>{following}</p>
//             <p>Following</p>
//           </div>
//           <div className="profile-stat">
//             <p>{followers}</p>
//             <p>Followers</p>
//           </div>
//           <div className="profile-stat">
//             <p>{posts.length}</p>
//             <p>Posts</p>
//           </div>
//         </div>
//         <div className="profile-posts">
//           {posts.map((post, index) => (
//             <div className="profile-post" key={index}>
//               <img className="profile-post-image" src={post.image} alt="Post" />
//               <textarea
//                 className="profile-post-caption"
//                 placeholder="Write a caption..."
//                 value={post.caption}
//                 onChange={(event) => {
//                   const newPosts = [...posts];
//                   newPosts[index].caption = event.target.value;
//                   setPosts(newPosts);
//                 }}
//               />
//               <button onClick={() => handleRemovePost(index)}>Remove</button>
//             </div>
//           ))}
//           <div className="profile-post-upload">
//             <input type="file" onChange={handlePostUpload} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function UserProfile() {
//   const [user, setUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [newProfileImage, setNewProfileImage] = useState(null);
//   const [newBio, setNewBio] = useState('');
//   const [newUsername, setNewUsername] = useState('');
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   useEffect(() => {
//     getUserProfile();
//   }, []);

//   const getUserProfile = async () => {
//     try {
//       const response = await axios.get('/user/edit'); // Assuming the API endpoint to fetch user profile data is '/user/index'
//       setUser(response.data);
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//     }
//   };

//   const handleEditProfile = () => {
//     setEditMode(true);
//   };

//   const handleCancelEdit = () => {
//     setEditMode(false);
//     // Reset the form fields and state
//     setNewProfileImage(null);
//     setNewBio('');
//     setNewUsername('');
//     setCurrentPassword('');
//     setNewPassword('');
//     setConfirmPassword('');
//   };

//   const handleSaveChanges = async () => {
//     try {
//       const data = {
//         bio: newBio,
//         username: newUsername,
//         currentPassword,
//         newPassword,
//         confirmPassword
//       };

//       const response = await axios.post('/user/edit', data); // Assuming the API endpoint to update user profile data is '/user/edit'

//       console.log(response.data);
//       // Refresh the user profile data
//       getUserProfile();
//       // Exit edit mode
//       setEditMode(false);
//       // Reset the form fields and state
//       setNewProfileImage(null);
//       setNewBio('');
//       setNewUsername('');
//       setCurrentPassword('');
//       setNewPassword('');
//       setConfirmPassword('');
//     } catch (error) {
//       console.error('Error saving profile changes:', error);
//     }
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="profile-container">
//       {editMode ? (
//         <>
//           <div className="profile-edit-form">
//             <div>
//               <label htmlFor="profileImage">Profile Image:</label>
//               <input
//                 type="file"
//                 id="profileImage"
//                 accept="image/*"
//                 onChange={(e) => setNewProfileImage(e.target.files[0])}
//               />
//             </div>
//             <div>
//               <label htmlFor="bio">Bio:</label>
//               <textarea
//                 id="bio"
//                 value={newBio}
//                 onChange={(e) => setNewBio(e.target.value)}
//               ></textarea>
//             </div>
//             <div>
//               <label htmlFor="username">Username:</label>
//               <input
//                 type="text"
//                 id="username"
//                 value={newUsername}
//                 onChange={(e) => setNewUsername(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="currentPassword">Current Password:</label>
//               <input
//                 type="password"
//                 id="currentPassword"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="newPassword">New Password:</label>
//               <input
//                 type="password"
//                 id="newPassword"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="confirmPassword">Confirm Password:</label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </div>
//             <div>
//               <button onClick={handleSaveChanges}>Save Changes</button>
//               <button onClick={handleCancelEdit}>Cancel</button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="profile-header">
//             <div className="profile-image">
//               <img src={user.pfp.url} alt="Profile" />
//             </div>
//             <div className="profile-info">
//               <h2>{user.userName}</h2>
//               <p>{user.bio}</p>
//               <button onClick={handleEditProfile}>Edit Profile</button>
//             </div>
//           </div>
//           <div className="profile-stats">
//             <div>
//               <h3>Posts</h3>
//               <p>{user.postId ? user.postId.length : 0}</p>
//             </div>
//             <div>
//               <h3>Followers</h3>
//               <p>{user.followers ? user.followers.length : 0}</p>
//             </div>
//             <div>
//               <h3>Following</h3>
//               <p>{user.following ? user.following.length : 0}</p>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Display user's posts */}
//       <div className="profile-posts">
//         <h2>Posts</h2>
//         {user.postId && user.postId.map((post) => (
//           <div key={post._id} className="post">
//             {/* Display post content */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default UserProfile;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    bio: '',
  });

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const response = await axios.get('/profile', {
        headers : {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleEditClick = () => {
    setEditing(true);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      bio: user.bio,
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put('/profile', formData, {
        headers : {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });
      setUser(response.data);
      setEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="profile-picture">
          <img src={user.pfp.url} alt="Profile Picture" />
          {editing ? (
            <div className="edit-profile-picture">
              <label htmlFor="profilePictureInput">Change Profile Picture</label>
              <input
                type="file"
                id="profilePictureInput"
                name="profilePicture"
                accept="image/*"
                onChange={handleInputChange}
              />
            </div>
          ) : null}
        </div>
        <div className="profile-details">
          <h2>{user.userName}</h2>
          {editing ? (
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          ) : (
            <p>
              {user.firstName} {user.lastName}
            </p>
          )}
          {editing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
            />
          ) : (
            <p>{user.bio}</p>
          )}
          {editing ? (
            <div className="profile-actions">
              <button onClick={handleCancelClick}>Cancel</button>
              <button onClick={handleSaveClick}>Save</button>
            </div>
          ) : (
            <button onClick={handleEditClick}>Edit Profile</button>
          )}
        </div>
      </div>
      <div className="profile-posts">
        <h3>My Posts</h3>
        {user.postId}
      </div>
      <div className="profile-followers">
        <h3>Followers</h3>
        {/* Render user's followers */}
      </div>
      <div className="profile-following">
        <h3>Following</h3>
        {/* Render user's following */}
      </div>
      <div className="profile-change-password">
        <h3>Change Password</h3>
        {/* Change password form */}
      </div>
    </div>
  );
}
