import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import axios from 'axios';
import { NULL } from 'sass';



export interface UserInfo {
  userInfo: {
    Email: string;
    Fname: string;
    Lname: string;
    Password: string;
    ProfileImg: string;
    Id: string;
  }
  Islogin: boolean;
  status: 'idle' | 'loading' | 'failed';

}

const initialState: UserInfo = {
  userInfo: {
    Email: "",
    Fname: "",
    Lname: "",
    Password: "",
    ProfileImg: "../../../icons/travel_app_person_purple1.png",
    Id: ""
  },
  Islogin: false,
  status: 'idle'
};
export const loginAsync = createAsyncThunk(
  'user/login',
  async (loginInfo: any, thunkAPI) => {
    // const{ Email,Password} =loginInfo;
    //to do encrept logindata
    try {
      const response = await axios.post('http://localhost:3001/users/login', loginInfo, { withCredentials: true })
      const data: any = response.data
      console.log("login data  from server 3001");
      console.log(data);
      if (data.ok)
        return data;
      else return thunkAPI.rejectWithValue("failed")
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.response.data)
    }

  }
);
export const SignupAsync = createAsyncThunk(
  'user/Signup',
  async (loginInfo: any, thunkAPI) => {
    // const{ Email,Password} =loginInfo;
    //to do encrept logindata
    try {
      const response = await axios.post('http://localhost:3001/users/Signup', loginInfo, { withCredentials: true })
      const data: any = response.data
      console.log("Signup data  from server 3001");
      console.log(data);
      console.log(response);
      
      if (data.ok)
        return data;
      else return thunkAPI.rejectWithValue("failed")
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.response.data)
    }

  }
);
export const logoutAsync = createAsyncThunk(
  'user/logout',
  async (loginInfo: any, thunkAPI) => {
    // const{ Email,Password} =loginInfo;
    //to do encrept logindata
    try {
      const response = await axios.post('http://localhost:3001/users/logout', loginInfo, { withCredentials: true })
      const data: any = response.data
      console.log(data);
      console.log(response.status);
      if (response.status === 204)
        return data;
      else return thunkAPI.rejectWithValue("failed")
    } catch (error: any) {
      thunkAPI.rejectWithValue(error.response.data)
    }

  }
);


export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    // login :(state,action)=>{
    //   state.userInfo = action.payload;
    // },

    // logout: (state, action) => {
    //   state = initialState;
    // }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.ok == true) {
          state.userInfo = action.payload;
          state.Islogin = true;
        }
        else {
          state = initialState;
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
      })
      //==================================================
      .addCase(logoutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state = initialState;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.status = 'failed';
      })
      //==================================================
      .addCase(SignupAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SignupAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.ok == true) {
          state.userInfo = action.payload;
          state.Islogin = true;
        }
        else {
          state = initialState;
        }
      })
      .addCase(SignupAsync.rejected, (state, action) => {
        state.status = 'failed';
        state = initialState;
      })

  },



});


// export const{login} =UserSlice.actions;
//export const { logout } = UserSlice.actions;
//export const{getUserInfoAsync} =UserSlice.caseReducers;

export const GetUser = (state: RootState) => state.User;
export default UserSlice.reducer;
