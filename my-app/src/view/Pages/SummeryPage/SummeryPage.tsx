import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getAds, getTravelAdsInfoAsync } from '../../../app/reducer/TravelAds';
import WeatherReducer, { getWeather, getWeatherInfoAsync } from '../../../app/reducer/WeatherReducer';
import SummeryComp from '../../components/SummeryComp/SummeryComp';
import './SummeryPage.scss';


const SummeryPage = () => {
    const Weather = useAppSelector(getWeather);
    const ads = useAppSelector(getAds);
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const { state }: any = useLocation();


    useEffect(() => {
        // dispatch(getWeatherInfoAsync("New York"));
        dispatch(getTravelAdsInfoAsync());
        console.log(Weather);
        console.log(ads);
    }, []);



    //const [PlaceOfTrip, setPlaceOfTrip] = useState("Weather")
    const [PlaceOfTrip, setPlaceOfTrip] = useState(Weather.WeatherInfo.location.name);
    return (
        <div className='summerywrapper'>
            <div className="travelheader">
                <div className="travelpic"></div>
                <div className="distantionName"></div>
                <div className="dateoftrip"></div>
                <div className="CompasIcon" onClick={() => {
            nav('/Personal_compass', {
                state: state
            })
        }}>
                </div>

            </div>
            <h3 className="funthings" >Fun things to know about {PlaceOfTrip}</h3>


            {ads.TravelAdsInfo.articles.map((element, index) => {
                return (
                    <SummeryComp key={index} element={element} />
                );
            })}
        </div>
    )
}

export default SummeryPage;