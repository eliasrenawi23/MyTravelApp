import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import axios from 'axios';


export interface hoteldata {
    hotelinfo: {
        city: string;
        name: string;  //hotel_name
        adress: string; //address
        Photo: string; //max_1440_photo_url
    }

    status: 'idle' | 'loading' | 'failed';

}

const initialState: hoteldata = {
    hotelinfo: {
        city: "",
        name: "",  //hotel_name
        adress: "", //address
        Photo: "" //max_1440_photo_url
    },
    status: 'idle'
};

export const getHoteldataAsync = createAsyncThunk(
    'Hotel/getHoteldata',
    async (_, thunkAPI) => {

        //TODO   add by city  
        ////by london
        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=london&appid=66dcc5168fc629c9c2ce73bbf12ae5e6`);
            console.log(res);
            console.log(res.data.coord.lat, res.data.coord.lon);
            var optionsCordenatot: any = {
                method: 'GET',
                url: 'https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates',
                params: {
                    checkin_date: '2022-08-05',
                    order_by: 'popularity',
                    units: 'metric',
                    longitude: res.data.coord.lon,
                    adults_number: '2',
                    latitude: res.data.coord.lat,
                    room_number: '1',
                    locale: 'en-gb',
                    filter_by_currency: 'AED',
                    checkout_date: '2022-08-06',
                    children_number: '2',
                    children_ages: '5,0',
                    page_number: '0',
                    categories_filter_ids: 'class::2,class::4,free_cancellation::1',
                    include_adjacency: 'true'
                },
                headers: {
                    'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
                    'X-RapidAPI-Key': 'f20c7dd1c2msh02c1203d7b9da61p15382ajsn8639d5761db6'
                }
            };
            //by cordenatott
            const res2 = await axios.request(optionsCordenatot);
            const data: any = res2.data
            console.log(res2.data);
            return data;
        } catch (error: any) {
            thunkAPI.rejectWithValue(error.response.data)
        }

    }
);


export const HotelReduser = createSlice({
    name: 'Hotel',
    initialState,
    reducers: {
        getHotel: (state, action) => {
            state.hotelinfo = action.payload;
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(getHoteldataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getHoteldataAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.hotelinfo.adress = action.payload.result[0].address;
                state.hotelinfo.Photo = action.payload.result[0].max_1440_photo_url;
                state.hotelinfo.name = action.payload.result[0].hotel_name;
            });
    },
});

export const getHotel = (state: RootState) => state.Hotel;
export default HotelReduser.reducer;
