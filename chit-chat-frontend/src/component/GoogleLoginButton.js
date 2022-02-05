import React from 'react';
import GoogleLogin from 'react-google-login';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

export default function GoogleButton({ onGoogleLogin }){
    // 로그인 성공 
    const onSuccess = async(response) => {
        const profile = response.getBasicProfile();

        console.log(response)
        // access_token : Google API 요청을 위해 보내는 토큰
        // expires_in : access token 남은 시간(초)
        // refresh_token : 새 액세스 토큰을 얻는 데 사용할 수 있는 토큰
        const {tokenObj : { access_token, id_token, token_type, expires_in} } = response;

        const googleId = profile.getId();
        const googleEmail = profile.getEmail();

        const data = {
            googleId,
            googleEmail,
            access_token,
            id_token,
            token_type,
            expires_in
        }
        console.log(data)
        // axios.post('/login', data)
        // .then(console.log("success"))
        // .catch(error => {
        //     console.log(error)
        // });
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
                accessType="offline"
                prompt="consent"
            />
        </div>
    )
}