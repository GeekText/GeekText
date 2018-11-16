import React, { Component } from 'react';
import axios from 'axios';
import config from '../../../../config';
import AddShippingAddressModal from './AddShippingAddressModal';


const DisplayAddress = (address) => (
  <tr>
    <td>
      <span className="d-block">{address.address} {address.address2}</span>
      <small className="text-muted">{address.city}, {address.statein} {address.zip}</small>
    </td>
    <td>
      <div className="custom-control custom-radio">
        <input id="radio1" name="payment-default" type="radio" className="custom-control-input" checked="" />
        <label className="custom-control-label" htmlFor="radio1"></label>
      </div>
    </td>
    <td>
      <button type="submit" className="btn btn-sm btn-danger"><i className="icon-squared-cross"></i> Remove Address</button>
    </td>
  </tr>
);

class ShippingInfo extends Component {
  constructor(props){
    super(props);
    this.state= {
      addresses: [{
        address: '',
        address2: '',
        city: '',
        statein: '',
        zip: ''
      }]
    };
  }

  componentDidMount(){
    axios.get(`/user/${config.usersObjectId}/data`)
      .then(function(res){
        console.log(res.data);
        this.setState({
          addresses: res.data.shippinginformation
        });
      }.bind(this));
  }

  render() {
    return(
      <div className="card">

        <div className="card-header">
          <h5>My Shipping Address Information</h5>
        </div>

        <div className="card-body">
          <table className="table align-items-center">
            <thead>
              <tr>
                <th scope="col">Shipping Address</th>
                <th scope="col">Default Shipping Address</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {this.state.addresses.map(address =>
                <DisplayAddress key={address._id} {...address} />
              )}
            </tbody>
          </table>
          <AddShippingAddressModal />
        </div>

      </div>
    );
  }
}

export default ShippingInfo;
