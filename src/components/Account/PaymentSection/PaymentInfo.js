import React, { Component } from 'react';
import axios from 'axios';
import config from '../../../../config';
import AddCardModal from './AddCardModal';

const DisplayCard = (card) => (
  <tr>
    <th scope="row">
      <img alt="Image" src="./img/Visa_Inc._logo.svg" className="avatar avatar-sm" />
    </th>
    <td>
      <span className="d-block">{card.cardnumber}</span>
      <small className="text-muted">Exp: {card.expirydate}</small>
    </td>
    <td>
      <div className="custom-control custom-radio">
        <input id="radio1" name="payment-default" type="radio" className="custom-control-input" checked="" />
        <label className="custom-control-label" htmlFor="radio1"></label>
      </div>
    </td>
    <td>
      <button type="submit" className="btn btn-sm btn-danger"><i className="icon-squared-cross"></i> Remove Card</button>
    </td>
  </tr>
);

class PaymentInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      cards: [{
        nameoncard: '',
        cardnumber: '',
        expirydate: '',
        securitycode:''
      }]
    };
  }

  componentDidMount(){
    axios.get(`/user/${config.usersObjectId}/data`)
      .then(function(res){
        console.log(res.data);
        this.setState({
          cards: res.data.paymentinformation
        });
      }.bind(this));
  }

  render() {
    return(
      <div className="card">

        <div className="card-header">
          <h5>My Payment Information</h5>
        </div>

        <div className="card-body">
          <table className="table align-items-center">
            <thead>
              <tr>
                <th scope="col">Card Type</th>
                <th scope="col">Card Number</th>
                <th scope="col">Default Payment Method</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {this.state.cards.map(card =>
                <DisplayCard key={card._id} {...card}/>
              )}
            </tbody>
          </table>
          <AddCardModal />
        </div>

      </div>
    );
  }
}

export default PaymentInfo;
