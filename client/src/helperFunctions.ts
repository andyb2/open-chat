import { store } from "./app/store";
import { userColor } from "./userColor";

type User = {
    username: string
    color: string
}

export const findAndRemoveUser = () => {
    const username = store.getState().user.username;
    const roomUsers: User[] = store.getState().room.roomUsers;
    const roomCopy = [...roomUsers];
    for (let idx=0; idx<roomUsers.length; idx++) {
        console.log(roomUsers[idx].username);
        if (roomUsers[idx].username === username) {
            roomCopy.splice(idx, 1);
            break;
        }
    }
    return roomCopy;
}

export const randomUserColorChoice = (): string => {
    const randomNumber = Math.floor(Math.random() * userColor.length);
    return userColor[randomNumber];
}