//import { useState } from 'react';
import { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import Link from '@mui/material/Link';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { changeNavText } from '../../../app/reducer/NavTextReducer';
import { GetUser, loginAsync, loginWithGoogle } from '../../../app/reducer/UserReducer';
import './Login.scss';
import 'react-cookie';

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
        if (user.Islogin) {
            nav('/', {
                state: state
            });
        }
        if (user.status === 'failed') {
            alert("Worng Password or Email try again.");
        }



    }, [dispatch, user]);

    function validate_emil(email: string) {
        var apos = email.indexOf("@");
        var dotop = email.lastIndexOf(".");
        if (apos < 1 || dotop - apos < 2)
            return false;
        return true;
    }
    const validatePassword=(pass:string)=>{
        var error="";
        var illegalChars = /[\W_]/; // allow only letters and numbers

        if(pass==""){
            error="the password is empty";
            alert(error)
            return false;
        } 
        if(pass.length<7||pass.length>15){
            error="the password length is not okey";
            alert(error)
            return false;
        }
        if(illegalChars.test(pass)){
            error = "The password contains illegal characters.\n";
            alert(error)
            return false;
        }
        if(pass.search(/[a-zA-Z]+/)==-1||pass.search(/[0-9]+/)==-1){
            error = "The password must contain at least one numeral.\n";
            alert(error);
            return false;
        }
        return true

    }
    function loginhandle(e: any) {
        console.log("login pressed");


        if (Email === "" || Password === "") {
            alert("The username or email field is empty.");
        }
        if (validate_emil(Email)) {
            alert("The email is not okey.");
        }
        validatePassword(Password);
        console.log("Email : " + Email + "+" + "Password :" + Password)
        dispatch(loginAsync({
            Email: Email,
            Password: Password
        }));
        console.log(user);

    }
    const handleFailure = (reasult: String) => {
        alert(reasult);

    }
    const handleLoginWithgoogle = (googledate: any) => {

        console.log(googledate)
        dispatch(loginWithGoogle({
            Email: googledate.profileObj.email,
            Fname: googledate.profileObj.givenName,
            Lname: googledate.profileObj.familyName,
            ProfileImg: googledate.profileObj.imageUrl,
            Id: googledate.profileObj.googleId,
            Password: "googlepassword",
            token: googledate.tokenId
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
                        onSuccess={handleLoginWithgoogle}
                        onFailure={handleFailure}
                        cookiePolicy={'single_host_origin'}>
                    </GoogleLogin>

                    or
                    <form className='other' action="submit">
                        <input type="text" className=' inputs username' placeholder='Email' onChange={(e: any) => setEmail(e.target.value)} />
                        <input type="password" className='inputs password' placeholder='Password' onChange={(e: any) => setPassword(e.target.value)} />

                    </form>
                    <button className='loginbtn' onClick={loginhandle}>login</button>

                    <div className="signupop">
                        <h3>dont have acount ? </h3>
                        <Link href="/signup" variant="body2">
                            <button className='SignUpbtn'> Sign Up</button>
                        </Link>
                    </div>

                </div>
            </div>


            )}


        </div>

    );
}

export default Login;
