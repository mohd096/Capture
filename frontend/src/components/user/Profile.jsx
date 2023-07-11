import React, { useState } from 'react';

function Profile(props) {
  const { name: initialName, bio: initialBio } = props;
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio);
  const [image, setImage] = useState("");
  const [editing, setEditing] = useState(false);
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [posts, setPosts] = useState([]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // TODO: Update the user's profile with the new name, bio, and image
    setEditing(false);
  };

  const handleFollow = () => {
    setFollowing(following + 1);
  };

  const handleUnfollow = () => {
    setFollowing(Math.max(following - 1, 0));
  };

  const handlePostUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const newPost = {
        image: e.target.result,
        caption: "",
      };
      setPosts([...posts, newPost]);
    };

    reader.readAsDataURL(file);
  };

  const handleRemovePost = (index) => {
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);
  };

  return (
    <div className="profile-container">
      <div className="profile-image-container">
        <img className="profile-image" src={image} alt="Profile Picture" />
        <input type="file" onChange={handleImageChange} />
      </div>
      <div className="profile-info-container">
        <div className="profile-header">
          <h1>{name}</h1>
          {editing ? (
            <div>
              <label>
                Username:
                <input type="text" value={name} onChange={handleNameChange} />
              </label>
              <label>
                Bio:
                <input type="text" value={bio} onChange={handleBioChange} />
              </label>
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div>
              <p>{bio}</p>
              <button onClick={handleEdit}>Edit Profile</button>
            </div>
          )}
        </div>
        <div className="profile-stats">
          <div className="profile-stat">
            <p>{following}</p>
            <p>Following</p>
          </div>
          <div className="profile-stat">
            <p>{followers}</p>
            <p>Followers</p>
          </div>
          <div className="profile-stat">
            <p>{posts.length}</p>
            <p>Posts</p>
          </div>
        </div>
        <div className="profile-posts">
          {posts.map((post, index) => (
            <div className="profile-post" key={index}>
              <img className="profile-post-image" src={post.image} alt="Post" />
              <textarea
                className="profile-post-caption"
                placeholder="Write a caption..."
                value={post.caption}
                onChange={(event) => {
                  const newPosts = [...posts];
                  newPosts[index].caption = event.target.value;
                  setPosts(newPosts);
                }}
              />
              <button onClick={() => handleRemovePost(index)}>Remove</button>
            </div>
          ))}
          <div className="profile-post-upload">
            <input type="file" onChange={handlePostUpload} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;