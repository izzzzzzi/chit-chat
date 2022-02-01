import React from 'react';
import GoogleLogin from 'react-google-login';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

function onSignIn(googleUser) {
    console.log("response to login");
    var authResponse = googleUser.getAuthResponse();
    var profile = googleUser.getBasicProfile();
    console.log(authResponse)
    var idToken = authResponse.id_token;
    var accessToek = authResponse.access_token;
    var userEmail = profile.getEmail();
}

export default function GoogleButton({ onGoogleLogin }){
    // 로그인 성공 
    const onSuccess = async(response) => {
        // const { googleId, profileObj : { email, name } } = response;
        onSignIn(response);
    }

    const onFailure = (error) => {
        console.log(error);
    }

    return(
        <div>
            <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Login With Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                accessType="offline"
                prompt="consent"
            />
        </div>
    )
}