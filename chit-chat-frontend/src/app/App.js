import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import Chat from '../user/chatting-random/ChattingRandom';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import account  from '../api/account';
import {getCurrentUser} from "../api/account";
import { ACCESS_TOKEN } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true
    }
    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {

    account.getCurrentUser(response => {
      this.setState({
        currentUser: response,
        authenticated: true,
        loading: false
      }
      )
    });
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    const loading = this.state.loading;
    const authenticated = this.state.authenticated;

    if(loading) {
      return <LoadingIndicator />
    }
    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader authenticated={authenticated} onLogout={this.handleLogout} />
        </div>
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Home}/>
            <PrivateRoute path="/profile"
                          authenticated={authenticated}
                          currentUser={this.state.currentUser}
                          component={Profile}/>
            <Route path="/login"
              render={(props) => <Login authenticated={authenticated} {...props} />}/>
            <Route path="/signup"
              render={(props) => <Signup authenticated={authenticated} {...props} />}/>
            <Route path="/oauth/redirect"
              render={(props) => <OAuth2RedirectHandler loadCurrentlyLoggedInUser={this.loadCurrentlyLoggedInUser} {...props} />}/>
            <Route component={NotFound}/>
            <Route path="/chatting-random"
              render={(props) => <Chat authenticated={authenticated} {...props} />}/>
          </Switch>
        </div>
        <Alert stack={{limit: 3}} 
          timeout = {3000}
          position='top-right' effect='slide' offset={65} />
      </div>
    );
  }
}

export default App;
