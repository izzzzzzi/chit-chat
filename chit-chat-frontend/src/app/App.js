import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import PrivateRoute from '../common/PrivateRoute';
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import ChattingRandom from '../chatting-random/ChattingRandom';
import Login from '../user/login/Login';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import ApiList  from '../api/ApiList';
import { ACCESS_TOKEN, USER } from '../constants';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: localStorage.getItem('user') ? true : false,
      currentUser: localStorage.getItem('user'),
      // loading: true, 임시 false
      loading: false
    }
    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    ApiList.getCurrentUser(response => {
      localStorage.setItem('user', JSON.stringify(response.user));
      this.setState({
        currentUser: response.user,
        authenticated: true,
        loading: false
      })
      if(!response) {
        this.setState({
          loading: false
        })
      }
    });
  }

  handleLogout() {
    localStorage.removeItem(USER);
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
    const currentUser = this.state.currentUser;

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
                          currentUser={currentUser}
                          component={Profile}/>
            <PrivateRoute path="/chatting-random"
                          authenticated={authenticated}
                          currentUser={currentUser}
                          component={ChattingRandom}/>
            <Route path="/login"
              render={(props) => <Login authenticated={authenticated} {...props} />}/>
            <Route path="/oauth/redirect"
              render={(props) => <OAuth2RedirectHandler {...props} />}/>
            <Route component={NotFound}/>
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
