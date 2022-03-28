
import './LoginF.scss';
import SignupIcon from '../../../icons/SignupIcon.png'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { GetUser } from '../../../app/reducer/UserReducer';
import { useEffect } from 'react';


const LoginF = () => {

    const nav = useNavigate();
    const { state }: any = useLocation();
    const user = useAppSelector(GetUser);


    useEffect(() => {
        console.log(user);
    }, [user]);
    function gotoSignup(e: any) {
        nav('/login', {
            state: state
        });
    }

    if (user.Islogin) {
        return (<div></div>);
    }
    else {

        return (
            <div className='SUwrapper'>
                <button className='Signupc' onClick={gotoSignup}><img src={SignupIcon} alt="" /> Sign up</button>
            </div>
        );
    }
}

export default LoginF;