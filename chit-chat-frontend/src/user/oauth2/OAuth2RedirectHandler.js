import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import { Redirect } from 'react-router-dom'

class OAuth2RedirectHandler extends Component {
    componentDidMount() {
        const {location:{state}, history} = this.props;
    }

    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');
        const {loadCurrentlyLoggedInUser} = this.props;

        if (token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            loadCurrentlyLoggedInUser();
            return <Redirect to={{
                pathname: "/profile",
                state: {
                    from: this.props.location.pathname
                }
            }}/>; 
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: { 
                    from: this.props.location,
                    error: error 
                }
            }}/>; 
        }
    }
}

export default OAuth2RedirectHandler;