import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import roomSlice from './reducer/roomSlice';
import userReducer from './reducer/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomSlice,
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
