// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserPage = ({ userId }) => {
//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);

//   const token = localStorage.getItem('token');

//   const getAllPosts = async () => {
//     try {
//       const response = await axios.get('https://example.com/api/posts', {
//         headers: {
//           "Authorization": "Bearer " + localStorage.getItem("token")
//         },
//         params: {
//           userId: userId,
//           populate: 'userId'
//         }
//       });
//       console.log(response.data); // Log the response data for debugging
//       const posts = response.data;
//       setPosts(posts);
//     } catch (error) {
//       console.log(error.message);
//       // Handle the error here
//     }
//   }

//   useEffect(() => {
//     getAllPosts();
//   }, []);

//   const handlePostSelect = (post) => {
//     console.log(post);
//     // Handle the post selection here
//   }

//   const handleDelete = async (postId) => {
//     try {
//       const response = await axios.delete(`posts/${postId}`, {
//         headers: {
//           "Authorization": "Bearer " + localStorage.getItem("token")
//         }
//       });
//       console.log(response.data); // Log the response data for debugging
//       // Handle the post deletion here
//     } catch (error) {
//       console.log(error.message);
//       // Handle the error here
//     }
//   }

//   return (
//     <div className='user-profile'>
//       {user && (
//         <>
//           <h2>{user.firstName}</h2>
//           <p>{user.emailAddress}</p>
//           <p>{user.bio}</p>
//         </>
//       )}
//       <div className='user-posts'>
//         {posts.map(post => (
//           <div key={post._id} className='post'>
//             <h3>{post.title}</h3>
//             <p>{post.content}</p>
//             <button onClick={() => handlePostSelect(post)}>Select</button>
//             <button onClick={() => handleDelete(post._id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default UserPage;



















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import UserProfile from './UserProfile';



// const token = localStorage.getItem('token'); // Get the authentication token from local storage


// const UserPage = ({ userId }) => {
//   const [user, setUser] = useState(null);
// //   const [posts, setPosts] = useState([]);
// const UserProfile = ({ user }) => {
//     return (
//       <div className='user-profile'>
//         {user && (
//           <>
//             <h2>{user.firstName}</h2>
//             <p>{user.emailAddress}</p>
//             <p>{user.bio}</p>
//           </>
//         )}
//       </div>
//     )
//   }
  

//   const getUserInfo = async () => {
//     try {
//       const response = await axios.get(`/user/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}` // Add the authentication token to the Authorization header
//         }
//       });
//       console.log(response.data); // Log the response data for debugging
//       const user = response.data;
//       setUser(user);
//     } catch (error) {
//       console.log(error.message);
//       // Handle the error here
//     }
//   }
  

//   useEffect(() => {
//     getUserInfo();
//     // getUserPosts();
//   }, [userId]); 

//   return (
//     <div className='user-page'>
//       {user && <UserProfile user={user} />}
//       <div className='post-index'>
//         {/* {allPosts} */}
//       </div>
//     </div>
//   )
// }

// export default UserPage;









//this is the one for the single user profile page as you can see in the userId = "64a65dda472491561c4d8e8a"

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserPage = () => {
//   const [user, setUser] = useState(null);
//   const token = localStorage.getItem('token');
//   const userId = '64a65dda472491561c4d8e8a'; // Replace with the actual user ID

//   const getUserInfo = async () => {
//     try {
//       const response = await axios.get(`/user/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         params: {
//           fields: 'firstName,userName,emailAddress'
//         }
//       });
//       console.log(response.data);
//       const user = response.data;
//       setUser(user);
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

//   useEffect(() => {
//     getUserInfo();
//   }, []);

//   return (
//     <div className='user-profile'>
//       {user && (
//         <>
//           <h2>{user.firstName}</h2>
//           <p>{user.userName}</p>
//           <p>{user.emailAddress}</p>
//         </>
//       )}
//     </div>
//   );
// }

// export default UserPage;





//this one is for all of the users profile page



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