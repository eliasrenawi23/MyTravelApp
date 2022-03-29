import { createAsyncThunk, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import axios from 'axios';

interface category {
    CategoryName: string;
    listincat: Array<item>;
  }
  
  interface item {
    name: string;
    quantity: number;
  }

export interface OneTravel {
    OneTravelInfo: {
        _id: String;
        travelDateFrom: String,
        travelDateTo: String,
        travelDest: String,
        numberOfPeople: Number,
        travelPurpos: String[],
        Luggage: String[],
        Transport: String[],
        Activity: String[],
        Accommodation: String[],
        Spiceal: String[],
        Listofcat: category[]
    }
    status: 'idle' | 'loading' | 'failed';

}



const initialState: OneTravel = {
    OneTravelInfo: {
        _id: "",
        travelDateFrom: "",
        travelDateTo: "",
        travelDest: "",
        numberOfPeople: 0,
        travelPurpos: [],
        Luggage: [],
        Transport: [],
        Activity: [],
        Accommodation: [],
        Spiceal: [],
        Listofcat: []


    },
    status: 'idle'
};

export const AddNewTravelAsync = createAsyncThunk(
    'Travel/GetTravelInfoAsync',
    async (NewTravelData: OneTravel, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:3001/travel/AddNewTravel', NewTravelData, { withCredentials: true })
            const data: any = response.data
            console.log("GetTravelInfoAsync data  from server 3001");
            console.log(data);
            if (!data.ok)
                return thunkAPI.rejectWithValue("failed");
            else return data;
        } catch (error: any) {
            //console.log(error);
            //thunkAPI.rejectWithValue("failed");
            thunkAPI.rejectWithValue(error.response.data)
        }

    }
);

export const NewTravelSlice = createSlice({
    name: 'NewTravel',
    initialState,
    reducers: {
        updatelistInputcomp: (state, action) => {
            function arrayRemove(arr: any, value: string) {
                return arr.filter(function (ele: string) {
                    return ele != value;
                });
            }
            const listname: string = action.payload.ListTochange;
            const delAddval: string = action.payload.ValueToAddDel;
            switch (listname) {
                case 'travelPurpos':
                    if (state.OneTravelInfo.travelPurpos.includes(delAddval)) {
                        state.OneTravelInfo.travelPurpos = arrayRemove(state.OneTravelInfo.travelPurpos, delAddval);
                    } else {
                        state.OneTravelInfo.travelPurpos.push(delAddval);
                    }
                    break;
                case 'Luggage':
                    if (state.OneTravelInfo.Luggage.includes(delAddval)) {
                        state.OneTravelInfo.Luggage = arrayRemove(state.OneTravelInfo.Luggage, delAddval);
                    } else {
                        state.OneTravelInfo.Luggage.push(delAddval);
                    } break;
                case 'Transport':
                    if (state.OneTravelInfo.Transport.includes(delAddval)) {
                        state.OneTravelInfo.Transport = arrayRemove(state.OneTravelInfo.Transport, delAddval);
                    } else {
                        state.OneTravelInfo.Transport.push(delAddval);
                    } break;
                case "Activity":
                    if (state.OneTravelInfo.Activity.includes(delAddval)) {
                        state.OneTravelInfo.Activity = arrayRemove(state.OneTravelInfo.Activity, delAddval);
                    } else {
                        state.OneTravelInfo.Activity.push(delAddval);
                    } break;
                case "Accommodation":
                    if (state.OneTravelInfo.Accommodation.includes(delAddval)) {
                        state.OneTravelInfo.Accommodation = arrayRemove(state.OneTravelInfo.Accommodation, delAddval);
                    } else {
                        state.OneTravelInfo.Accommodation.push(delAddval);
                    } break;
                case "Spiceal":
                    if (state.OneTravelInfo.Spiceal.includes(delAddval)) {
                        state.OneTravelInfo.Spiceal = arrayRemove(state.OneTravelInfo.Spiceal, delAddval);
                    } else {
                        state.OneTravelInfo.Spiceal.push(delAddval);
                    }
                    break;
            }
            console.log(current(state))

        },
        updatetimeandinputs: (state, action) => {
            state.OneTravelInfo.travelDateFrom = action.payload.travelDateFrom;
            state.OneTravelInfo.travelDateTo = action.payload.travelDateTo;
            state.OneTravelInfo.travelDest = action.payload.travelDest;
            state.OneTravelInfo.numberOfPeople = Number(action.payload.numberOfPeople);
        },
        loadTravel: (state, action) => {
            state.OneTravelInfo = action.payload.element;
        } ,
        UpdateInViwlist: (state, action) => {
            state=current(state);
            state.OneTravelInfo.Listofcat = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(AddNewTravelAsync.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(AddNewTravelAsync.fulfilled, (state, action) => {
                action.payload.ok ? state.status = 'idle' : state.status = 'failed';
            })
            .addCase(AddNewTravelAsync.rejected, (state, action) => {
                state.status = 'failed';
            })
    },

});

export const { updatelistInputcomp, updatetimeandinputs, loadTravel,UpdateInViwlist } = NewTravelSlice.actions;
export const GetOneTravel = (state: RootState) => state.Travel;
export default NewTravelSlice.reducer;
