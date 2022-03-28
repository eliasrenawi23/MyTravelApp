import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { changeNavText } from '../../../app/reducer/NavTextReducer';
import { GetTravel, GetTravelInfoAsync } from '../../../app/reducer/TravelReduser';
import './Homepage.scss';

const Homepage = () => {

    const nav = useNavigate();
    const {state}:any = useLocation();
    const dispatch = useAppDispatch();
    const alltravels = useAppSelector(GetTravel);


    useEffect(() => {
        dispatch(GetTravelInfoAsync());
        dispatch(changeNavText(""));

      }, [dispatch]);


    function clickNewTravel(e:any){
        nav('/TravelInfo1', {
            state: state
        });
        //dispatch(GetTravelInfoAsync());



    }
    return (

        <div className='wrapper'>
            <div className='GloabGIF'>
                <div className='imge'></div>

            </div>
            <div className='NewTravelbtn_Wrapper'>
                <button className='NewTravelbtn' onClick={clickNewTravel}>New Travel</button>
            </div>
        </div>
    )

}

export default Homepage;