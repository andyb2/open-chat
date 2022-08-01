import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import roomSlice from './reducer/roomSlice';
import userSlice from './reducer/userSlice';
import viewPortSlice from './reducer/viewPort';

export const store = configureStore({
  reducer: {
    user: userSlice,
    room: roomSlice,
    width: viewPortSlice,
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
