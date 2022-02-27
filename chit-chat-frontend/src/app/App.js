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
import { ACCESS_TOKEN, USER } from '../constants';
import Alert from 'react-s-alert';

export default function App () {
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  useEffect(() => {
    ApiList.getCurrentUser(res => {
      setCurrentUser(res.user);
      // setCurrentUser(localStorage.setItem('user', JSON.stringify(res.user)));
      setAuth(true);
      setLoading(false);
      console.log(currentUser)
      if (!res) {setLoading(true)};
    })
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem(USER);
    localStorage.removeItem(ACCESS_TOKEN);
    setAuth(false);
    setCurrentUser(null);
    Alert.success("You're safely logged out!", {
      position: 'top-right',
      effect: 'slide',
    });
  }

  if(loading) { return <LoadingIndicator /> }
  return (
    <Layout>
      <Header authenticated={authenticated} onLogout={handleLogout}/>
      {/* <Alert stack={{limit: 3}} 
          timeout = {3000}
          position='top-right' effect='slide' offset={65} /> */}
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
    </Layout>

  )
}

