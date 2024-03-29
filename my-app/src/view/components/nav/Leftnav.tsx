import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { GetUser, logoutAsync } from '../../../app/reducer/UserReducer';
import ETIcon from '../../../icons/travel_app_person_purple1.png';
import './Leftnav.scss';

interface openClose {
  Open: boolean;
}


const Leftnav = (props: openClose) => {
  const [userimgUrl, setuserimgUrl] = useState(ETIcon);
  //const [Name, setName] = useState("Edit Profile");

  const { state }: any = useLocation();

  const user = useAppSelector(GetUser);
  const dispatch = useAppDispatch();


  const { Open } = props;
  useEffect(() => {
    // setName(user.userInfo.Fname + ' ' + user.userInfo.Lname);
    // console.log(Name);


  }, [user])


  function signoutfunc(e: any) {


    dispatch(logoutAsync({}));
    console.log(user.Islogin);
  }


  if (Open)
    return (
      <ul className='Open' >
        <li><img src={userimgUrl} alt="Profile Pic" /></li>
        <li>Edit Profile</li>
        <li>Settings</li>
        <li><div className='signoutb' onClick={signoutfunc}>Sign Out</div></li>
        <li>Contact us</li>
        <li>About</li>
        <li>Rate the app</li>
      </ul>
    )
  else
    return (
      <ul className='Closed'>
        <li><img src={userimgUrl} alt="Profile Pic" /></li>
        <li>Edit Profile</li>
        <li>Settings</li>
        <li>Sign Out</li>
        <li>Contact us</li>
        <li>About</li>
        <li>Rate the app</li>
      </ul>
    )

}

export default Leftnav;