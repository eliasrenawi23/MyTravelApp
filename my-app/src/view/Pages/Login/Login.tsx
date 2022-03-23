//import { useState } from 'react';
import { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { changeNavText } from '../../../app/reducer/NavTextReducer';
import { GetUser, getUserInfoAsync, loginAsync } from '../../../app/reducer/UserReducer';
import './Login.scss';

//import { Link, useLocation, useNavigate } from "react-router-dom";


interface Userinfo {
    Email: string;
    Fname: string;
    Lname: string;
}

function Login(props: any) {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const user = useAppSelector(GetUser);
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const { state }: any = useLocation();
    var googleid: string
    if (process.env.REACT_APP_GOOGLE_CLIENT_ID) {
        googleid = process.env.REACT_APP_GOOGLE_CLIENT_ID
    } else {
        throw new Error("REACT_APP_GOOGLE_CLIENT_ID environment variable is not set")
    }
    const [loginData, setloginData] = useState(
        localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')) : null
    );

    console.log(user);
    useEffect(() => {
        dispatch(changeNavText("Sign up to save List"));

        if (user.Islogin == true) {
            nav('/', {
                state: state
            });
        }
        if (user.status === 'failed') {
            alert("Worng Password or Email try again.");
            user.status = 'idle';
        }



    }, [dispatch, user]);


    function SignUpHandel(e: any) {
        console.log("signup pressed");
        // dispatch(login({
        //     userInfo: {
        //         Email: "Elias",
        //         Fname: "Elias",
        //         Lname: "elias"
        //     },
        //         Islogin: "True",
        //     status: 'loading'

        // }));
        // console.log(user.userInfo);


        // useEffect(()=>{
        //     //GetUserName()
        // },[]);
        dispatch(getUserInfoAsync());
        if (Email === "" || Password === "") {
            alert("The username or email field is empty.");
        }


    }
    const handleFailure = (reasult: String) => {
        alert(reasult);

    }
    const handleLogin = (googledate: any) => {
        if (Email === "" || Password === "") {
            alert("The username or email field is empty.");
        }
        dispatch(loginAsync({
            Email: Email,
            Password: Password
        }));
    }
    const handlelogout = (googledate: any) => {
        localStorage.removeItem('loginData');
        setloginData(null);
    }

    return (
        <div className='wrapper'>
            {loginData ? (<div>
                <h3>you logged in as {loginData.email}</h3>
                <button onClick={handlelogout}></button>

            </div>) : (<div><div className='imagTeampet'>
                {/* <img src="" alt="" /> */}
            </div>
                <div className='loginOp'>
                    {/* <GoogleLogin clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}> */}
                    <GoogleLogin
                        clientId={googleid}
                        buttonText='Log in with Google'
                        onSuccess={handleLogin}
                        onFailure={handleFailure}
                        cookiePolicy={'single_host_origin'}>
                    </GoogleLogin>

                    or
                    <form className='other' action="submit">
                        <input type="text" className=' inputs username' placeholder='Email' onChange={(e: any) => setEmail(e.target.value)} />
                        <input type="password" className='inputs password' placeholder='Password' onChange={(e: any) => setPassword(e.target.value)} />

                    </form>
                    <button className='loginbtn' onClick={SignUpHandel}>login</button>

                    <div className="signupop">
                        <h3>dont have acount ? </h3>
                        <button className='SignUpbtn' onClick={SignUpHandel}>Sign Up</button></div>

                </div>
            </div>


            )}


        </div>

    );
}

export default Login;
