import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class TabSignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.signUserIn = this.signUserIn.bind(this);
  }

  updateUsername(evt){
    this.setState({
      username: evt.target.value
    });
  }
  updatePassword(evt){
    this.setState({
      password: evt.target.value
    });
  }

  signUserIn(evt){
    evt.preventDefault();
    let URL = 'http://localhost:8080/auth/signin';
    const user = {
      username: this.state.username,
      password: this.state.password
    };


    axios.post(URL, {  username: this.state.username,
      password: this.state.password
     })
      .then(function (response) {
        console.log("Im here!");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      alert('Signing in .... \\0.0/');
  }

  render() {
    return(
      <div className="tab-pane fade show active" id="sign-in" role="tabpanel" aria-labelledby="sign-in-tab">
        <form onSubmit={this.signUserIn}>
          <div className="form-group">
            <label htmlFor="inputUsername">Username</label>
            <input id="inputUsername" className="form-control" type="text" placeholder="Username" required autoFocus value={this.state.username} onChange={this.updateUsername}/>
          </div>
          <div className="form-group">
            <label htmlFor="inputPasswordSignIn">Password</label>
            <input id="inputPasswordSignIn" className="form-control" type="password" placeholder="Password" required value={this.state.password} onChange={this.updatePassword}/>
          </div>
          <button type="submit" className="btn btn-warning btn-lg btn-block p-1 mt-3">Sign In</button>
          <div className="container text-center">
          </div>
        </form>
      </div>
    );
  }
}

export default TabSignIn;
