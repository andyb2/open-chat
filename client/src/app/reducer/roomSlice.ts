import { createSlice } from '@reduxjs/toolkit';

export interface JoinedUser {
  currentRoom: string
  previousRoom: string
  roomUsers: []
  chat: {}[]
  privateMessages: {
    [username: string]: {
      lastIdxChecked?: number | boolean
      messages: {}[]
    } 
  }
  privateRoom: any
  activeMissedToggle: boolean
  privateRoomIsActive: boolean
  mobile: boolean
}

const initialState: JoinedUser = {
  currentRoom: 'general-lobby',
  previousRoom: '',
  roomUsers: [],
  chat: [],
  privateMessages: {},
  privateRoom: '',
  privateRoomIsActive: false,
  activeMissedToggle: false,
  mobile: false,
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

    createPrivateRoom: (state, action) => {
      const { socketId, username } = action.payload;
      if ( !state.privateMessages[username] ) {
        const privateRoomObject = {
          socketId: socketId,
          username: username,
          messages: [],
          lastIdxChecked: false,
        };
        state.privateMessages[username] = privateRoomObject;
      }
    },

    privateRoomName: (state, action) => {
      state.privateRoom = action.payload;
    },

    activePrivateRoom: (state, action) => {
      state.privateRoomIsActive = action.payload;
    },

    removeUser: (state, action) => {
      state.roomUsers = action.payload;
    },

    messages: (state, action) => {
      const { message, user, timeOfMessage, privateMessage, activePrivateRoom } = action.payload;
      const senderOrReceiver = activePrivateRoom ? activePrivateRoom.username : user.username;
      const messageObject = {
        sender: user.username,
        color: user.color,
        timeStamp: timeOfMessage,
        content: message,
      }
      if ( !privateMessage ) {
        const chatCopy = [...state.chat];
        chatCopy.push({...messageObject});
        state.chat = chatCopy;
      } else {
        const privateCopy = {...state.privateMessages};
        privateCopy[senderOrReceiver].messages.push(messageObject);
        if ( state.privateRoomIsActive === false && privateCopy[senderOrReceiver].lastIdxChecked === false ) {
          privateCopy[senderOrReceiver].lastIdxChecked = privateCopy[senderOrReceiver].messages.length - 1;
        }
        state.privateMessages = privateCopy;
      }
    },

    missedMessages: (state, action) => {
      const { username } = action.payload;
      const privateCopy = { ...state.privateMessages };
      privateCopy[username].lastIdxChecked = false;
      state.privateMessages = privateCopy;
    },

    activeMissedMessageToggle: (state, action) => {
      state.activeMissedToggle = action.payload;
    },

    mobileViewSidebarToggle: (state, action) => {
      state.mobile = action.payload;
    },

    resetRoomState: () => initialState,
  }
});

export const { 
    joinedRoom,
    userList,
    removeUser,
    messages,
    createPrivateRoom,
    privateRoomName,
    activePrivateRoom,
    missedMessages,
    activeMissedMessageToggle, 
    mobileViewSidebarToggle,
    resetRoomState,
} = roomSlice.actions;

export default roomSlice.reducer;