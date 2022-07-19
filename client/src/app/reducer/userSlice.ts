import { createSlice } from '@reduxjs/toolkit';

export interface User {
  username: string
}

const initialState: User = {
  username: '',
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    user: (state, action) => {
      const stateCopy = {...state};
      stateCopy.username = action.payload;
      state.username = stateCopy.username;
    }
  }
});

export const { user } = userSlice.actions;
export default userSlice.reducer;
