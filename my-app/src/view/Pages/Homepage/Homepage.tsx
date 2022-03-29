import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { GetUser } from '../../../app/reducer/dist/UserReducer';
import { changeNavText } from '../../../app/reducer/NavTextReducer';
import { GetTravel, GetTravelAllInfoAsync } from '../../../app/reducer/TravelReduser';
import './Homepage.scss';
import Travelicon from "../../../icons/TravelIconBlue.png";
import Traveliconblue from "../../../icons/tavelIcon.png";


interface travel {
    travelDateFrom: Date,
    travelDateTo: Date,
    travelDest: String,
    numberOfPeople: Number,
    travelPurpos: String[],
    Luggage: String[],
    Transport: String[],
    Activity: String[],
    Accommodation: String[],
    Spiceal: String[]

}
interface list {
    propsname: string;
    listname: string
}
const Homepage = () => {

    const nav = useNavigate();
    const { state }: any = useLocation();
    const dispatch = useAppDispatch();
    const alltravels = useAppSelector(GetTravel);
    const User = useAppSelector(GetUser);
    const [oneTravil, setoneTravil] = useState(null);

    //User.Islogin
    useEffect(() => {
        dispatch(GetTravelAllInfoAsync());
        dispatch(changeNavText(""));

    }, [dispatch, ]);

    useEffect(() => {
        dispatch(changeNavText(""));
        console.log(oneTravil);
        if(oneTravil!==null){
        nav('/ViewListPage', {
            state: state
        });
    }

    }, [oneTravil]);



    function clickNewTravel(e: any) {
        nav('/TravelInfo1', {
            state: state
        });
        //dispatch(GetTravelInfoAsync());
    }

    function comparedate(dates: Date) {
        const today: Date = new Date();
        const yearmonth = dates.toString().split('-');
        const dateofend = yearmonth[2].split('T');
        if (Number(yearmonth[0]) < today.getFullYear()) return true; ///2021 < 2022
        if (Number(yearmonth[0]) > today.getFullYear()) return false; ///2023 > 2022 not done
        //the same year check the month
        if (Number(yearmonth[1]) < (today.getMonth() + 1)) return true; //3<4 done
        if (Number(yearmonth[1]) > (today.getMonth() + 1)) return false; //5>4 done
        //same year same month check the date
        if (Number(dateofend[0]) < today.getDate()) return true;  //28<29 done else not done 
        return false;
    }

    const TravilList = () => {


        return (
            <div className="Travels-grid-container">
                {alltravels.TravelsInfo.travels.map((element, index) => {
                    //if element end date> date todey change to actvie
                    var doneActive: string;
                    (comparedate(element.travelDateTo)) ? doneActive = "active" : doneActive = "done";
                    return (
                        <div className={"box-ingrid-" + doneActive} onClick={(e: any) => (setoneTravil({ element })
                        )}>
                            <div className="nameTravel">{element.travelDest}</div>
                        </div>
                    );
                })
                }
            </div>
        )
    }
    return (
        <div className='wrapper'>
            <div className='GloabGIF'>
                <div className='imge'></div>
            </div>

            <div className='NewTravelbtn_Wrapper'>
                <button className='NewTravelbtn' onClick={clickNewTravel}>New Travel</button>
                {true ? <div>                 <div className='year'>{new Date().getFullYear()}</div>
                    <TravilList /></div> : null}
            </div>

        </div>
    )

}

export default Homepage;