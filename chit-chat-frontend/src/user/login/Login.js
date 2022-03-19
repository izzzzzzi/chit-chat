import React, { useEffect } from 'react';
import './Login.css';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from '../../constants';
import { Redirect } from 'react-router-dom'
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import Alert from 'react-s-alert';

export default function Login(props) {
    useEffect(()=> {
        // 로그인한 사용자가 로그인 페이지로 왔을 때 pathname: "/oauth/redirect"
        if(props.location.state && props.location.state.error) {
            setTimeout(() => {
                Alert.error(props.location.state.error, {
                    timeout: 5000
                });
                props.history.replace({
                    pathname: props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }, [])

    if(props.authenticated) {
        return <Redirect
                to={{ pathname: "/profile", state: { from: props.location }}}/>;
    }
    return(
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">Login to ChitChat</h1>
                <SocialLogin />
            </div>
        </div>        
    )
}

function SocialLogin() {
    return(
    <div className="social-login">
        <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
            <img src={googleLogo} alt="Google" /> Log in with Google</a>
        <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
            <img src={fbLogo} alt="Facebook" /> Log in with Facebook</a>
    </div>
    )
}
