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

export const checkForLastMissedMessage = () => {
    const privateMessages = store.getState().room.privateMessages;
    const username = store.getState().user.username;
    let onlyMissedMsg = false;

    for (const user in privateMessages) {
        if ( user !== username && typeof privateMessages[user].lastIdxChecked === 'number' ) {
            onlyMissedMsg = true;
            continue;
        }
        if ( user === username && typeof privateMessages[user].lastIdxChecked === 'number' ) {
            continue;
        }
    }
    return onlyMissedMsg;
}