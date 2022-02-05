import React from "react";
import { Link } from "react-router-dom";
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

const LogIn = () =>  {
    return (
      <>
        <h1>login</h1>
        <FacebookLoginButton/>
        <GoogleLoginButton/>
      </>
    );
}

export default LogIn;