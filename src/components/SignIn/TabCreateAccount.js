import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';

function validatePassword(password) {
  // Validating Password
  var passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{7,}$/;
  if (!passwordRegEx.test(password)){
    console.log("Password is Not Valid");
    return false;
  }

  return true;
}

class TabCreateAccount extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      redirect: false
    };

    this.updateFirstname = this.updateFirstname.bind(this);
    this.updateLastname = this.updateLastname.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.createNewAccount = this.createNewAccount.bind(this);
    // this.updateRouteAccount = this.updateRouteAccount.bind(this);
    // this.renderRedirectAccount = this.renderRedirectAccount.bind(this);
    console.log(this.props);
  }

  updateFirstname(evt){
    this.setState({
      firstname: evt.target.value
    });
  }
  updateLastname(evt){
    this.setState({
      lastname: evt.target.value
    });
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
  // updateRouteAccount = () =>{
  //   this.setState({
  //     redirect: true
  //   });
  // }
  // updateRouteAccount(){
  //   this.setState({
  //     redirect : true
  //   });
  // }
  // renderRedirectAccount = () => {
  //   if (this.state.redirect){
  //     return <Redirect to='/account' />;
  //   }
  // }
  createNewAccount(evt){
    evt.preventDefault();
    if(validatePassword(this.state.password)) {
      axios.post('/auth/newcreateaccount', {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        username: this.state.username,
        password: this.state.password})
        .then(function(response) {
          console.log(response);
          console.log(response.data._id);
        });
      alert('Account was created.');
    } else {
      alert('Password not strong enough please try again.');
    }
  }

  render() {
    // console.log(this.match);
    // console.log(this.props);
    return(
      <div className="tab-pane fade" id="create-account" role="tabpanel" aria-labelledby="create-account-tab">
        <form onSubmit={this.createNewAccount} >
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputFirstname">First Name</label>
              <input id="inputFirstname" className="form-control" type="text" placeholder="First Name" required value={this.state.firstname} onChange={this.updateFirstname}/>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputLastName">Last Name</label>
              <input id="inputLastname" className="form-control" type="text" placeholder="Last Name" required value={this.state.lastname} onChange={this.updateLastname}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputUsernameCreateAccount">Username</label>
            <input id="inputUsernameCreateAccount" className="form-control" type="text" placeholder="Username" required value={this.state.username} onChange={this.updateUsername}/>
          </div>
          <div className="form-group">
            <label htmlFor="inputPasswordCreateAccount">Password</label>
            <input id="inputPasswordCreateAccount" className="form-control" type="password" placeholder="Password" required value={this.state.password} onChange={this.updatePassword}/>
          </div>
          <button className="btn btn-warning btn-lg btn-block p-1 mt-3" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default TabCreateAccount;
