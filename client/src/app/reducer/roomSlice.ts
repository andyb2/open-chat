import { createSlice } from '@reduxjs/toolkit';

export interface JoinedUser {
  currentRoom: string
  previousRoom: string
  roomUsers: []
  chat: {}[]
  privateMessages: {
    [username: string]: {}
  }
  privateRoom: string
}

const initialState: JoinedUser = {
  currentRoom: 'general-lobby',
  previousRoom: '',
  roomUsers: [],
  chat: [],
  privateMessages: {},
  privateRoom: '',
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

    privateMessages: (state, action) => {
      const { socketId, username } = action.payload;
      const privateRoomObject = {
        ...socketId,
        ...username,
        messages: []
      };
      state.privateMessages[username] = privateRoomObject;
    },

    privateRoom: (state, action) => {
      state.privateRoom = action.payload;
    },

    removeUser: (state, action) => {
      state.roomUsers = action.payload;
    },

    messages: (state, action) => {
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

export const { joinedRoom, userList, removeUser, messages, privateMessages, privateRoom } = roomSlice.actions;
export default roomSlice.reducer;