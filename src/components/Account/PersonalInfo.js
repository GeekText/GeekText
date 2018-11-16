import React, { Component } from 'react';
import axios from 'axios';
import config from '../../../config';

/*
  - And we are making this a property of the component since the data will
  never change.
*/
import data from '../../assets/data/schemaUSA';
var states = data.states;

class PersonalInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      address: '',
      address2: '',
      city: '',
      statein: '',
      zip: ''
    };

    this.updateFirstname = this.updateFirstname.bind(this);
    this.updateLastname = this.updateLastname.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.updateAddress2 = this.updateAddress2.bind(this);
    this.updateCity = this.updateCity.bind(this);
    this.updateStateIn = this.updateStateIn.bind(this);
    this.updateZip = this.updateZip.bind(this);
    this.updatePersonalInfo = this.updatePersonalInfo.bind(this);
  }

  // UPDATE THE STATE WHEN USER TYPES INTO THE FIELDS
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
  updateEmail(evt){
    this.setState({
      email: evt.target.value
    });
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
  // UPDATE AJAX REQUEST FUNCTION
  updatePersonalInfo(evt){
    evt.preventDefault();
    axios.put(`/user/${config.usersObjectId}/updateinfo`, {
      personalinformation:{
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        address: this.state.address,
        address2: this.state.address2,
        city: this.state.city,
        statein: this.state.statein,
        zip: this.state.zip
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
          firstname: res.data.personalinformation.firstname,
          lastname: res.data.personalinformation.lastname,
          email: res.data.personalinformation.email,
          address: res.data.personalinformation.address,
          address2: res.data.personalinformation.address2,
          city: res.data.personalinformation.city,
          statein: res.data.personalinformation.statein,
          zip: res.data.personalinformation.zip
        });
      }.bind(this));
  }


  render() {
    return(
      <div className="card">
        <div className="card-header">
          <h5>My Personal Information</h5>
        </div>
        <div className="card-body">
          <form onSubmit={this.updatePersonalInfo}>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="userFirstName">First Name:</label>
                <input id="userFirstName" className="form-control" type="text" placeholder="First Name" value={this.state.firstname} onChange={this.updateFirstname}/>
              </div>
              <div className="form-group col">
                <label htmlFor="userLastName">Last Name:</label>
                <input id="userLastName" className="form-control" type="text" placeholder="Last Name" value={this.state.lastname} onChange={this.updateLastname}/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="userEmail">Email:</label>
              <input id="userEmail" className="form-control" type="text" placeholder="Email" value={this.state.email} onChange={this.updateEmail}/>
            </div>
            <div className="form-group">
              <label htmlFor="userAddress">Address:</label>
              <input  id="userAddress" className="form-control" type="text" placeholder="1234 Main St" value={this.state.address} onChange={this.updateAddress}/>
            </div>
            <div className="form-group">
              <label htmlFor="userAddress2">Address 2:</label>
              <input  id="userAddress2" className="form-control" type="text" placeholder="Apartment, studio, or floor" value={this.state.address2} onChange={this.updateAddress2}/>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="userCity">City:</label>
                <input id="userCity" className="form-control" type="text" value={this.state.city} onChange={this.updateCity}/>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="userState">State:</label>
                <select id="userState" className="form-control" value={this.state.statein} onChange={this.updateStateIn}>
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
                <label htmlFor="inputZip">Zip:</label>
                <input id="inputZip" className="form-control" type="text" value={this.state.zip} onChange={this.updateZip}/>
              </div>
            </div>
            <button className="btn btn-warning" type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    );
  }
}

export default PersonalInfo;
