import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import axios from 'axios';

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

export interface NewTravel {
    NewTravelInfo: {
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
    status: 'idle' | 'loading' | 'failed';

}

const initialState: NewTravel = {
    NewTravelInfo: {
        travelDateFrom: null,
        travelDateTo: null,
        travelDest: "",
        numberOfPeople: 0,
        travelPurpos: [],
        Luggage: [],
        Transport: [],
        Activity: [],
        Accommodation: [],
        Spiceal: []

    },
    status: 'idle'
};

export const NewTravelSlice = createSlice({
    name: 'NewTravel',
    initialState,
    reducers: {
        updatelist: (state, action) => {
            console.log(current(state));
            function arrayRemove(arr: any, value: string) {
                return arr.filter(function (ele: string) {
                    return ele != value;
                });
            }
            //state.NewTravelInfo = action.payload;
            const listname: string = action.payload.ListTochange;
            const delAddval: string = action.payload.ValueToAddDel;
            switch (listname) {
                case 'travelPurpos':
                    if (state.NewTravelInfo.travelPurpos.includes(delAddval)) {
                        state.NewTravelInfo.travelPurpos = arrayRemove(state.NewTravelInfo.travelPurpos, delAddval);
                    } else {
                        state.NewTravelInfo.travelPurpos.push(delAddval);
                    }
                    break;
                case 'Luggage':
                    if (state.NewTravelInfo.Luggage.includes(delAddval)) {
                        state.NewTravelInfo.Luggage = arrayRemove(state.NewTravelInfo.Luggage, delAddval);
                    } else {
                        state.NewTravelInfo.Luggage.push(delAddval);
                    } break;
                case 'Transport':
                    if (state.NewTravelInfo.Transport.includes(delAddval)) {
                        state.NewTravelInfo.Transport = arrayRemove(state.NewTravelInfo.Transport, delAddval);
                    } else {
                        state.NewTravelInfo.Transport.push(delAddval);
                    } break;
                case "Activity":
                    if (state.NewTravelInfo.Activity.includes(delAddval)) {
                        state.NewTravelInfo.Activity = arrayRemove(state.NewTravelInfo.Activity, delAddval);
                    } else {
                        state.NewTravelInfo.Activity.push(delAddval);
                    } break;
                case "Accommodation":
                    if (state.NewTravelInfo.Accommodation.includes(delAddval)) {
                        state.NewTravelInfo.Accommodation = arrayRemove(state.NewTravelInfo.Accommodation, delAddval);
                    } else {
                        state.NewTravelInfo.Accommodation.push(delAddval);
                    } break;
                case "Spiceal":
                    if (state.NewTravelInfo.Spiceal.includes(delAddval)) {
                        state.NewTravelInfo.Spiceal = arrayRemove(state.NewTravelInfo.Spiceal, delAddval);
                    } else {
                        state.NewTravelInfo.Spiceal.push(delAddval);
                    }
                    break;
            }
            state.NewTravelInfo = action.payload
            console.log(current(state));


        }
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.

    //   extraReducers: (builder) => {
    //     builder
    //   },

});

export const { updatelist } = NewTravelSlice.actions;
export const GetTravel = (state: RootState) => state.Travel;
export default NewTravelSlice.reducer;
