import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../../config';
// import axios from 'axios';

class LoginInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateLoginInfo = this.updateLoginInfo.bind(this);
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
  updateLoginInfo(evt){
    evt.preventDefault();
    axios.put(`/user/${config.usersObjectId}/updateinfo`, {
      logininformation:{
        username: this.state.username,
        password: this.state.password
      }
    })
      .catch(function(error){
        console.log(error);
      });
    alert('Changes Saved');
  }
  componentDidMount() {
    axios.get(`/user/${config.usersObjectId}/data`)
      .then(function(res){
        this.setState({
          username: res.data.logininformation.username,
          password: res.data.logininformation.password
          // nickname: res.data.nickname
        });
      }.bind(this));
  }

  render() {
    return(
      <div className="card">
        <div className="card-header">
          <h5>Bookify Login Information</h5>
        </div>
        <div className="card-body">
          <form onSubmit={this.updateLoginInfo}>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="userName">Username:</label>
                <input id="userName" className="form-control" type="text" placeholder="Username" value={this.state.username} onChange={this.updateUsername}/>
              </div>
              <div className="form-group col">
                <label htmlFor="userPassword">Password:</label>
                <input id="userPassword" className="form-control" type="password" placeholder="Password" value={this.state.password} onChange={this.updatePassword}/>
              </div>
            </div>
            <button className="btn btn-warning" type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    );
  }
}

LoginInfo.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
};

export default LoginInfo;
