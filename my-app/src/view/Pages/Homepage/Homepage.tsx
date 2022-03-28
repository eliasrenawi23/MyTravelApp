import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { GetUser } from '../../../app/reducer/dist/UserReducer';
import { changeNavText } from '../../../app/reducer/NavTextReducer';
import { GetTravel, GetTravelAllInfoAsync } from '../../../app/reducer/TravelReduser';
import './Homepage.scss';
import Travelicon from "../../../icons/tavelIcon.png"


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
    //User.Islogin
    useEffect(() => {
        dispatch(GetTravelAllInfoAsync());
        dispatch(changeNavText(""));

    }, [dispatch]);

    console.log(User.Islogin);
    console.log(alltravels.TravelsInfo.travels);

    function clickNewTravel(e: any) {
        nav('/TravelInfo1', {
            state: state
        });
        //dispatch(GetTravelInfoAsync());



    }
    const LuggagePList: Array<list> = [{ propsname: "trolly", listname: "Luggage" }, { propsname: "suitcase", listname: "Luggage" }, { propsname: "briefcase", listname: "Luggage" }, { propsname: "backpack", listname: "Luggage" }, { propsname: "handbag", listname: "Luggage" }, { propsname: "multy", listname: "Luggage" }];

    const TravilList = () => (
        <div className="Travels-grid-container">
            {   
            alltravels.TravelsInfo.travels.map((element, index) => {
                //if element end date> date todey change to actvie
                const today: Date = new Date();
                if (element.travelDateTo < today) {
                    return (
                        <div className="box-ingrid-done">
                            <img src={Travelicon} alt="" />
                            <div className="name">{element.travelDest}</div>
                        </div>

                    );
                }
                else {
                    return (
                        <div className="box-ingrid-active">
                            <img src={Travelicon} alt="" />
                            <div className="name">{element.travelDest}</div>
                        </div>

                    );
                }
            })
            }
        </div>
    )
    return (

        <div className='wrapper'>
            <div className='GloabGIF'>
                <div className='imge'></div>

            </div>
            <div className='NewTravelbtn_Wrapper'>
                <button className='NewTravelbtn' onClick={clickNewTravel}>New Travel</button>
                {User.Islogin ?
                    <TravilList />
                    : null
                }
            </div>

        </div>
    )

}

export default Homepage;