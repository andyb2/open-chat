import { createSlice } from '@reduxjs/toolkit';

export interface JoinedUser {
  currentRoom: string
  previousRoom: string
  roomUsers: string[]
  chat: object[]
}

const initialState: JoinedUser = {
  currentRoom: 'general-lobby',
  previousRoom: '',
  roomUsers: [],
  chat: []
};

export const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    joinedRoom: (state, action) => {
      state.previousRoom = state.currentRoom;
      state.currentRoom = action.payload;
      state.chat = [];
    },
    userList: (state, action) => {
      state.roomUsers = action.payload;
    }, 
    removeUser: (state, action) => {
      state.roomUsers = action.payload;
    },
    messages: (state, action) => {
      const { message, username } = action.payload;
      const messageObject = {
        sender: username,
        content: message
      }
      const chatCopy = [...state.chat];
      chatCopy.push({...messageObject});
      state.chat = chatCopy;
    }
  }
});

export const { joinedRoom, userList, removeUser, messages } = roomSlice.actions;
export default roomSlice.reducer;