import React, { Component } from 'react';
import axios from 'axios';
import config from '../../../config';

class NicknameInfo extends Component {
  constructor(props){
    super(props);
    this.state = {nickname: ''};

    this.updateNickname = this.updateNickname.bind(this);
    this.updateNicknameInfoForm = this.updateNicknameInfoForm.bind(this);
  }

  updateNickname(evt){
    this.setState({
      nickname: evt.target.value
    });
  }
  updateNicknameInfoForm(evt){
    evt.preventDefault();
    axios.put(`/user/${config.usersObjectId}/updateinfo`, {
      nicknameinformation:{
        nickname: this.state.nickname
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
          nickname: res.data.nicknameinformation.nickname
        });
      }.bind(this));
  }

  render() {
    return(
      <div className="card">
        <div className="card-header">
          <h5>Book Rating and Commenting Information</h5>
        </div>
        <div className="card-body">
          <form onSubmit={this.updateNicknameInfoForm}>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="userNickname">Nickname:</label>
                <input id="userNickname" className="form-control" type="text" placeholder="Nickname" value={this.state.nickname} onChange={this.updateNickname}/>
              </div>
            </div>
            <button className="btn btn-warning" type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    );
  }
}

export default NicknameInfo;
