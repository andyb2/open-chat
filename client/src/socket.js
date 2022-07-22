import io from 'socket.io-client';
import { store } from './app/store';
import { userList, removeUser, messages } from './app/reducer/roomSlice';

const socket = io(window.location.origin);

socket.on('connect', () => {

    socket.on('join-room', (usersInRoom) => {
        store.dispatch(userList(usersInRoom));
    });

    socket.on('message', ({ message, user, timeOfMessage }) => {
        console.log(`RAN FROM CLIENT`, store);
        store.dispatch(messages({ message, user, timeOfMessage }));
    });

    socket.on('remove-room-user', (roomData) => {
        store.dispatch(removeUser(roomData));
    });
});

export default socket;