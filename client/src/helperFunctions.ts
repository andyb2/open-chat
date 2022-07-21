import { store } from "./app/store";

export const findAndRemoveUser = () => {
    const username = store.getState().user.username;
    const roomUsers = store.getState().room.roomUsers;
    const roomCopy = [...roomUsers];
    for (let idx=0; idx<roomUsers.length; idx++) {
        if (roomUsers[idx] === username) {
            roomCopy.splice(idx, 1);
            break;
        }
    }
    return roomCopy;
}