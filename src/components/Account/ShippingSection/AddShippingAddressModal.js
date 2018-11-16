import React, { Component } from 'react';
import axios from 'axios';
import config from '../../../../config';

import data from '../../../assets/data/schemaUSA';
var states = data.states;

class AddShippingAddressModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      address: '',
      address2: '',
      city: '',
      statein: '',
      zip: ''
    };

    this.updateAddress = this.updateAddress.bind(this);
    this.updateAddress2 = this.updateAddress2.bind(this);
    this.updateCity = this.updateCity.bind(this);
    this.updateStateIn = this.updateStateIn.bind(this);
    this.updateZip = this.updateZip.bind(this);
    this.createNewShippingAddress = this.createNewShippingAddress.bind(this);
  }

  updateAddress(evt){
    this.setState({
      address: evt.target.value
    });
  }
  updateAddress2(evt){
    this.setState({
      address2: evt.target.value
    });
  }
  updateCity(evt){
    this.setState({
      city: evt.target.value
    });
  }
  updateStateIn(evt){
    this.setState({
      statein: evt.target.value
    });
  }
  updateZip(evt){
    this.setState({
      zip: evt.target.value
    });
  }
  createNewShippingAddress(evt){
    evt.preventDefault();
    axios.post(`/creditcard/${config.usersObjectId}/createshippingaddress`, {
      address: this.state.address,
      address2: this.state.address2,
      city: this.state.city,
      statein: this.state.statein,
      zip: this.state.zip
    })
      .then(function(response){
        console.log(response);
      });
    alert('New Shipping address created.');
  }

  render() {
    return(
      <form onSubmit={this.createNewShippingAddress}>
        <button type="button" className="btn btn-warning" data-toggle="modal" data-target="#newShippingAddressModal">Add Shipping Address</button>
        <div className="modal fade" id="newShippingAddressModal" tabIndex="-1" role="dialog" aria-labelledby="newShippingAddressModalTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="newShippingAddressModalTitle">Shipping Information</h5>
                <button type="button" className="btn btn-danger" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="userShippingAddress">Address:</label>
                  <input  id="userShippingAddress" className="form-control" type="text" placeholder="1234 Main St" value={this.state.address} onChange={this.updateAddress}/>
                </div>
                <div className="form-group">
                  <label htmlFor="userShippingAddress2">Address 2:</label>
                  <input  id="userShippingAddress2" className="form-control" type="text" placeholder="Apartment, studio, or floor" value={this.state.address2} onChange={this.updateAddress2}/>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="userShippingCity">City:</label>
                    <input id="userShippingCity" className="form-control" type="text" value={this.state.city} onChange={this.updateCity}/>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="userShippingState">State:</label>
                    <select id="userShippingState" className="form-control" value={this.state.statein} onChange={this.updateStateIn}>
                      <option>Choose...</option>
                      {states.map(function(state){
                        return (
                          <option value={state.key} key={state.key} >
                            {state.display}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="inputShippingZip">Zip:</label>
                    <input id="inputShippingZip" className="form-control" type="text" value={this.state.zip} onChange={this.updateZip}/>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-danger" type="button" data-dismiss="modal">Close</button>
                  <button className="btn btn-warning" type="submit">Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default AddShippingAddressModal;
