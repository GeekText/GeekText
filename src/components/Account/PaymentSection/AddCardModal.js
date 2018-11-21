import React, { Component } from 'react';
import axios from 'axios';
import config from '../../../../config';

function validateCreditCard(cardnumber, expirydate, securitycode) {
  // Validating Credit Card Number
  cardnumber = cardnumber.replace(/\s+/g, '');
  var sixteenDigits = /^\d{16}$/;
  if (!sixteenDigits.test(cardnumber)){
    console.log("Credit Card Number Not Valid");
    return false;
  }

  // Validating Expiry Date
  var today, dayToTest;
  var splitDate = expirydate.split('/');
  if (splitDate.length > 1) {
    var month= splitDate[0];
    var year = splitDate[1];
    today = new Date();
    dayToTest = new Date();
    dayToTest.setFullYear(year, month, 1);

    if (dayToTest < today) {
      console.log("Expiration Date is not valid");
      return false;
    }
  } else {
    console.log("Expiration Date is not valid");
    return false;
  }

  // Validate Security Code
  securitycode = securitycode.replace(/\s+/g, '');
  var threeDigits = /^\d{3}$/;
  if (!threeDigits.test(securitycode)){
    console.log("Security Code Not Valid");
    return false;
  }

  return true;

}

class AddCardModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      nameoncard: '',
      cardnumber: '',
      expirydate: '',
      securitycode: ''
    };

    this.updateNameOnCard = this.updateNameOnCard.bind(this);
    this.updateCardNumber = this.updateCardNumber.bind(this);
    this.updateExpiryDate = this.updateExpiryDate.bind(this);
    this.updateSecurityCode = this.updateSecurityCode.bind(this);
    this.createNewCreditCard = this.createNewCreditCard.bind(this);
  }

  updateNameOnCard(evt){
    this.setState({
      nameoncard: evt.target.value
    });
  }
  updateCardNumber(evt){
    this.setState({
      cardnumber: evt.target.value
    });
  }
  updateExpiryDate(evt){
    this.setState({
      expirydate: evt.target.value
    });
  }
  updateSecurityCode(evt){
    this.setState({
      securitycode: evt.target.value
    });
  }
  createNewCreditCard(evt){
    evt.preventDefault();
    if (validateCreditCard(this.state.cardnumber, this.state.expirydate, this.state.securitycode)) {
      axios.post(`/creditcard/${config.usersObjectId}/createcreditcard`, {
        nameoncard: this.state.nameoncard,
        cardnumber: this.state.cardnumber,
        expirydate: this.state.expirydate,
        securitycode: this.state.securitycode
      })
        .then(function(response){
          console.log(response);
        });
      alert('New credit card created.');
    } else {
      alert('Credit Card Format was not valid please try again.');
    }
  }

  render() {
    return(
      <form onSubmit={this.createNewCreditCard} >
        <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#newPaymentModal">Add New Card</button>
        <div className="modal fade" id="newPaymentModal" tabIndex="-1" role="dialog" aria-labelledby="newPaymentModalTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="newPaymentModalTitle">Payment Information</h5>
                <button type="button" className="btn btn-danger" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="userNameOnCard">Name on Card:</label>
                  <input id="userNameOnCard" className="form-control" type="text" value={this.state.nameoncard} onChange={this.updateNameOnCard} />
                </div>
                <div className="form-group">
                  <label htmlFor="userCardNumber">Card Number:</label>
                  <input  id="userCardNumber" className="form-control" type="text" value={this.state.cardnumber} onChange={this.updateCardNumber} />
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="cardExpiryDate">Expiry Date:</label>
                    <input id="cardExpiryDate" className="form-control" type="text" placeholder="MM/YY" value={this.state.expirydate} onChange={this.updateExpiryDate} />
                  </div>
                  <div className="form-group col">
                    <label htmlFor="cardSecurityCode">Security Code:</label>
                    <input id="cardSecurityCode" className="form-control" type="text" value={this.state.securitycode} onChange={this.updateSecurityCode} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" type="button" data-dismiss="modal">Close</button>
                <button className="btn btn-warning" type="submit">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default AddCardModal;
