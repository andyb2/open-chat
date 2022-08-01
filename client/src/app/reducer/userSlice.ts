import { createSlice } from '@reduxjs/toolkit';

export interface User {
    username: string
    color: string
}

const initialState: User = {
    username: '',
    color: ''
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    user: (state, action) => {
      const { username, color } = action.payload;
        state.username = username;
        state.color = color; 
    },
    resetUserState: () => initialState,
  }
});

export const { user, resetUserState } = userSlice.actions;
export default userSlice.reducer;
