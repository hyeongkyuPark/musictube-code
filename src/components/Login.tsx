import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_SUCCESS } from '../modules/userModule';
import { RootState } from '../store/store';


function Login() {
    const { loading, data, error } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const responseGoogle = useCallback((response: GoogleLoginResponse) => {
        const user = {
            name: response.profileObj.givenName,
            profileImg: response.profileObj.imageUrl,
        }
        dispatch({ type: GET_USER_SUCCESS, payload: user });
        sessionStorage.setItem('userLogedin', JSON.stringify(user));
    }, [dispatch])

    useEffect(() => {
        const user = sessionStorage.getItem('userLogedin');
        if (user === null) return;
        dispatch({ type: GET_USER_SUCCESS, payload: JSON.parse(user) });
    }, [dispatch]);

    return (
        <>
            {!data ? <GoogleLogin
                clientId="279176208416-cosjap6j5dmpqmngbs2k24qqcgj3cc56.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
                : <div>로그인됨{data.name}({data.profileImg})</div>
            }
        </>
    );
}

export default Login;
