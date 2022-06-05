import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import Header from '../components/Header';
import Layout from '../components/Layout';
import NotFound from '../components/NotFound';
import LoadingIndicator from '../components/LoadingIndicator';
import Home from '../home/Home';
import ChattingRandom from '../chatting-random/ChattingRandom';
import Login from '../user/login/Login';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import ApiList  from '../api/ApiList';
import { USER } from '../constants';
import Alert from 'react-s-alert';
import VoteModal from '../chatting-random/VoteModal';
import ApiController from '../api/ApiController';

export default function App () {
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuth] = useState((localStorage.getItem(USER)) ? true : false);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    ApiList.getCurrentUser(res => {
      localStorage.setItem(USER, JSON.stringify(res.user));
      setCurrentUser(res.user);
      setAuth(true);
      setLoading(false);
      if (!res) {setLoading(true);};
    })
  }, []);

  // reference - https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
  const clearAllCookies = () => {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem(USER);
    ApiController.defaults.headers.common.Authorization = '';
    setAuth(false);
    setCurrentUser(null);
    clearAllCookies();
    ApiList.logout(res => {
      Alert.success("You're safely logged out!", {
        position: 'top-right',
        effect: 'slide',
      });
    });
  }

  if(loading) { return <LoadingIndicator /> }
  return (
    <Layout>
      <Header authenticated={authenticated} onLogout={handleLogout}/>
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
            <PrivateRoute path="/voting"
                          authenticated={authenticated}
                          currentUser={currentUser}
                          component={VoteModal}/>    
            <Route path="/voting" component={VoteModal}/>         
            <Route path="/login"
              render={(props) => <Login authenticated={authenticated} {...props} />}/>
            <Route path="/oauth/redirect"
              render={(props) => <OAuth2RedirectHandler {...props} />}/>
            <Route component={NotFound}/>
          </Switch>
    </Layout>
  )
}

