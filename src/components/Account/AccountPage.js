import React, { Component } from 'react';
// import axios from 'axios';
/* Components */
import LoginInfo from './LoginInfo';
import NicknameInfo from './NicknameInfo';
import PersonalInfo from './PersonalInfo';
import PaymentInfo from './PaymentSection/PaymentInfo';
import ShippingInfo from './ShippingSection/ShippingInfo';

class AccountPage extends Component {
  render() {
    return(
      <div className="AccountPageCSS">
        <div className="row m-3">
          <div className="col-md-6 my-3">
            <LoginInfo />
          </div>
          <div className="col-md-6 my-3">
            <NicknameInfo />
          </div>
        </div>
        <div className="row m-3">
          <div className="col-lg-6 my-1">
            <PersonalInfo />
          </div>
          <div className="col-lg-6 my-1">
            <div className="row mx-0">
              <PaymentInfo />
            </div>
            <div className="row mx-0 my-4">
              <ShippingInfo />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountPage;
