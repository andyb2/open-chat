import { createSlice } from '@reduxjs/toolkit';

export interface JoinedUser {
  currentRoom: string
  previousRoom: string
  roomUsers: []
  chat: {}[]
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
      console.log(`USUSUSUSUUERS`, action.payload)
    }, 
    removeUser: (state, action) => {
      state.roomUsers = action.payload;
    },
    messages: (state, action) => {
      console.log(`CHHHHAT`, action.payload)
      const { message, user, timeOfMessage } = action.payload;
      const messageObject = {
        sender: user.username,
        color: user.color,
        timeStamp: timeOfMessage,
        content: message,
      }
      const chatCopy = [...state.chat];
      chatCopy.push({...messageObject});
      state.chat = chatCopy;
    }
  }
});

export const { joinedRoom, userList, removeUser, messages } = roomSlice.actions;
export default roomSlice.reducer;