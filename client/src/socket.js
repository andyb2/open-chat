import io from 'socket.io-client';
import { store } from './app/store';
import { userList, removeUser } from './app/reducer/roomSlice';

const socket = io(window.location.origin);

socket.on('connect', () => {
    console.log(`connected`);
    socket.on('join-room', (connectedUser) => {
        store.dispatch(userList(connectedUser));
    });
    socket.on('remove-room-user', (username) => {
        store.dispatch(removeUser(username));
    })
})

export default socket;