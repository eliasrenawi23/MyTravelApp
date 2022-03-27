import Geocode from "react-geocode";

import './EX_commercial.scss';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { useCallback, useState } from "react";


const EX_commercial = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });
      //const API_KEY = API_KEY_FROM_GOOGLE  // how to get key - step are below

 async function  getplace(){
    
    try {

      const res= await Geocode.fromAddress("Eiffel Tower")
        const { lat, lng } = res.results[0].geometry.location;
        console.log(lat, lng);
  
    } catch (error) {
      console.error(error);
    }
   
  }

  const handleSelect = async (value:string) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };
  return (
    <div>
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lng}</p>

          <input {...getInputProps({ placeholder: "Type address" })} />

          <div>
            {loading ? <div>...loading</div> : null}

            {suggestions.map(suggestion => {
              const style = {
                backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
              };

              return (
                <div {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  </div>
);
  // return (
  //   <div className='commercialworapper'>EX_commercial


  //     {/* <button  className='bouttonss' onClick={getplace}>getplace</button> */}
  //     {/* <div >
  //        <GoogleComponent
         
  //         apiKey={API_KEY}
  //         language={'en'}
  //         country={'country:in|country:us'}
  //         coordinates={true}
  //         locationBoxStyle={'custom-style'}
  //         locationListStyle={'custom-style-list'}
  //         onChange={(e) => { this.setState({ place: e }) }} />
  //     </div> */}
  //   </div>
  // )
}

export default EX_commercial