import React from 'react';
import GoogleLogin from 'react-google-login';

const clientId = "34787663748-m3gr1iv17cp3aof21v1g12cpkllco7gj.apps.googleusercontent.com"

export default function GoogleButton({ onGoogleLogin }){
    const onSuccess = async(response) => {
        // const { googleId, profileObj : { email, name } } = response;
        console.log("response to login");
        // await onGoogleLogin({
          //로그인 성공시 서버에 전달한 데이터!
        //     socialId : googleId,
        //     socialType : 'google',
        //     email,
        //     nickname : name
        // });
    }

    const onFailure = (error) => {
        console.log(error);
        // popup_closed_by_us
    }

    return(
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}