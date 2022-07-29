import io from 'socket.io-client';
import { store } from './app/store';
import { userList, removeUser, messages, createPrivateRoom } from './app/reducer/roomSlice';

const socket = io(window.location.origin);

socket.on('connect', () => {

    socket.on('join-room', (usersInRoom) => {
        store.dispatch(userList(usersInRoom));
    });

    socket.on('message', ({ message, user, timeOfMessage, privateMessage, sender }) => {
        if (privateMessage) {
            console.log(`RECEIVED`, user, sender, message, privateMessage)
            store.dispatch(createPrivateRoom({ socketId: sender, username: user.username }));
        }
        store.dispatch(messages({ message, user, timeOfMessage, privateMessage }));
    });

    socket.on('remove-room-user', (roomData) => {
        store.dispatch(removeUser(roomData));
    });
});

export default socket;