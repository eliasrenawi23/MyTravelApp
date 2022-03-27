import Geocode from "react-geocode";

import './EX_commercial.scss';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getHotel, getHoteldataAsync } from "../../../app/reducer/hotelReduser";


interface hoteldata {
  name: string;  //hotel_name
  adress: string; //address
  Photo: string; //max_1440_photo_url

}


const EX_commercial = () => {
  const hotel = useAppSelector(getHotel);
  const dispatch = useAppDispatch();
  const [address, setAddress] = useState("");
  const [Name, setName] = useState("");
  const [Photo, setPhoto] = useState("");

  const [lat, setlat] = useState("");
  const [lng, setlng] = useState("");


  useEffect(() => {
    // dispatch(getWeatherInfoAsync("New York"));
    dispatch(getHoteldataAsync());

    setAddress(hotel.hotelinfo.adress);
    setName(hotel.hotelinfo.name);
    setPhoto(hotel.hotelinfo.Photo);

  }, []);


  return (
    <div className='commercialworapper'>
      <div className="checkoutthehotel"> check out {Name}</div>

      <img className="hotelImg " src={Photo} alt="" />
      <div className="hotel name">{Name}.</div>
      <div className="hotel Add">{address}.</div>


    </div>
  );
}

export default EX_commercial;