import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

/* Pages */
import Book from './Book/Book';
import BookDetailsPage from './BookDetails/BookDetailsPage';
import AccountPage from './Account/AccountPage';
import SignInPage from './SignIn/SignInPage';

/* Components */
import HeaderNav from './HeaderNav';
import FooterSection from './FooterSection';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  render() {
    return (
      <Router>
        <div>
          <HeaderNav />
          <Switch>
            <Route path="/Book" component={Book} />
            <Route path="/BookDetails" component={BookDetailsPage} />
            <Route path="/account" component={AccountPage} />
            <Route path="/auth/signin" component={SignInPage} />
            <Route exact path="/" render={() => (
              /*The Main Part Of the Website should go inside of <main></main> */
              <main>
             
              </main>
            )} />
          </Switch>
          <FooterSection />
        </div>
      </Router>
    );
  }
}

export default App;
