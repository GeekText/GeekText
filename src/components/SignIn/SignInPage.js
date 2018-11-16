import React, { Component } from 'react';

import TabSignIn from './TabSignIn';
import TabCreateAccount from './TabCreateAccount';

class SignIn extends Component {
  render() {
    return(
      <div className="container my-5">
        <div className="row">
          <div className="CardColumn col-md"></div>
          <div className="CardColumn col-lg">
            <div className="MainCardComponent card text-center bg-light">
              <div className="card-header">

                <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="sign-in-tab" data-toggle="tab" href="#sign-in" role="tab" aria-controls="sign-in" aria-selected="true">Sign In</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="create-account-tab" data-toggle="tab" href="#create-account" role="tab" aria-controls="create-account" aria-selected="false">Create Account</a>
                  </li>
                </ul>

              </div>
              <div className="card-body tab-content" id="myTabContent">
                <TabSignIn />
                <TabCreateAccount />
              </div>
            </div>
          </div>
          <div className="CardColumn col-md"></div>
        </div>
      </div>
    );
  }
}

export default SignIn;
