import io from 'socket.io-client';
import { store } from './app/store';
import { userList, removeUser, messages, createPrivateRoom, resetRoomState } from './app/reducer/roomSlice';
import { resetUserState, user } from './app/reducer/userSlice';

const socket = io(window.location.origin);

socket.on('connect', () => {
    
    socket.on('join-room', (usersInRoom) => {
        store.dispatch(userList(usersInRoom));
    });

    socket.on('message', ({ message, user, timeOfMessage, privateMessage, sender }) => {
        if (privateMessage) {
            store.dispatch(createPrivateRoom({ socketId: sender, username: user.username }));
        }
        store.dispatch(messages({ message, user, timeOfMessage, privateMessage }));
    });

    socket.on('remove-room-user', (roomData) => {
        store.dispatch(removeUser(roomData));
    });

    socket.on('disconnect', () => {
        store.dispatch(resetUserState());
        store.dispatch(resetRoomState());
        socket.off('join-room');
        socket.off('message');
        socket.off('remove-room-user');
        socket.off('disconnect');
    })
    
});

export default socket;