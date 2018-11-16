import React, { Component} from 'react';
import {Link} from 'react-router-dom';

class FooterSection extends Component {
  render() {
    return(
      <footer>
        <div className="container px-5 pt-3 border-top box-shadow">
          <div className="row">
            <div className="col">
              <p>© 2018 GeekText, Inc.</p>
            </div>
            <div className="col">
              <Link to="/account">Account</Link>
            </div>
            <div className="col">
              <Link to="/contact">Contact</Link>
            </div>
            <div className="col">
              <Link to="/BookDetails">BookDetails</Link>
            </div>
            <div className="col">
              <Link to="/Book">Book</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default FooterSection;
