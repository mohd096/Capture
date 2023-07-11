import React, { Component } from 'react';
import axios from 'axios';

export default class PostCreate extends Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      image: ''
    }
  }

  onFileChange(e) {
    this.setState({ image: e.target.files[0] })
  }

  onSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', this.state.image)
    axios.post("posts", formData, {
      headers : {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create New Post</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input type="file" name="image" onChange={this.onFileChange} />
          </div>
            <div>
                <label>Caption</label>
                <input
                    type="text"
                    name="name"
                />
                </div>
          <div className="form-group">
            <input type="submit" value="Upload" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}