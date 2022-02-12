import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
    return (
        <Route {...rest} render={ props => (
            authenticated ? <Component {...rest} /> :
                <Redirect to={{
                    pathname: "/login",
                    state: { from : props.location}
                }}/>
        )}/>
    );
};
export default PrivateRoute;