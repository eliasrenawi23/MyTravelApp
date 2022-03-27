import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import hotelReduser from './reducer/hotelReduser';
import NavtextSlice from './reducer/NavTextReducer';
import NewTravelReduser from './reducer/NewTravelReduser';
import TravelAds from './reducer/TravelAds';
import TravelReduser from './reducer/TravelReduser';
import UserReducer from './reducer/UserReducer';
import WeatherReducer from './reducer/WeatherReducer';

export const store = configureStore({
  reducer: {
    User: UserReducer,
    NavText: NavtextSlice,
    Weather: WeatherReducer,
    Ads: TravelAds,
    Hotel: hotelReduser,
    Travel: NewTravelReduser,
    Travellist: TravelReduser,
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
