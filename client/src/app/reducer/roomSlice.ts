import { createSlice } from '@reduxjs/toolkit';

export interface JoinedUser {
  usersConnected: string[]
}

const initialState: JoinedUser = {
  usersConnected: [],
};

export const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    userList: (state, action) => {
        state.usersConnected = action.payload;
    }, 
    removeUser: (state, action) => {
        const usersCopy = [...state.usersConnected]
        const idxOfUser = usersCopy.indexOf(action.payload);
        usersCopy.splice(idxOfUser, 1);
        state.usersConnected = usersCopy;
    }
  }
});

export const { userList, removeUser } = roomSlice.actions;
export default roomSlice.reducer;