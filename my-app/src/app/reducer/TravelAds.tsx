import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import axios from 'axios';

interface article {
    source: {
        id: String;
        name: String;
    },
    author: String,
    title: String;
    description: String;
    url: String;
    urlToImage: String;
    publishedAt: String;
    content: String;

}
export interface TravelAdsInfo {
    TravelAdsInfo: {
        totalResults: number;
        articles: Array<article>;

    }
    status: 'idle' | 'loading' | 'failed';

}

const initialState: TravelAdsInfo = {

    TravelAdsInfo: {
        totalResults: 0,
        articles: []
    },
    status: 'idle'
};

export const getTravelAdsInfoAsync = createAsyncThunk(
    'Ads/GetTravelAds',
    async (_, thunkAPI) => {
        var today = new Date();

        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() - 1);
        var apiReq = `https://newsapi.org/v2/everything?q=travel&from=${date}&sortBy=popularity&apiKey=e5ad11d3152a4b65a74da06032d8264b`;
        console.log(apiReq);
        try {
            const response = await axios.get(apiReq)
            const data: any = response.data
            console.log("TravelAds data");
            console.log(data);
            return data
        } catch (error: any) {
            thunkAPI.rejectWithValue(error.response.data)
        }

    }
);


export const TravelAds = createSlice({
    name: 'TravelAds',
    initialState,
    reducers: {
        getTravelAds: (state, action) => {
            state.TravelAdsInfo = action.payload;
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(getTravelAdsInfoAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTravelAdsInfoAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.TravelAdsInfo = action.payload;
            });
    },
});

export const getAds = (state: RootState) => state.Ads;
export default TravelAds.reducer;