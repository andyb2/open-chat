import { useSelector, useDispatch } from "react-redux";
import { privateRoomName, activePrivateRoom, missedMessages, activeMissedMessageToggle } from "../app/reducer/roomSlice";
import styled from "styled-components";

const PrivateContainer = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 1rem;
`

const Username = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    padding: 0.5rem;
    background-color: rgb(20, 20, 20);
    color: white;
    gap: 0.2rem;
    font-size: 12px;
    width: 100px;
    margin: 0;
    border-bottom: none;
    cursor: pointer;
    background-color: 'black';
    &.active {
        border: 1px solid rgb(70, 70, 70);
        background-color: rgb(70, 70, 70);
        &:hover {
            background-color: rgb(70, 70, 70);
        }
    }
    &:hover {
        background-color: rgb(50, 50, 50);
    }
    @media (max-width: 400px) {
        padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    }
`

const MissedMessageCounter = styled.div`
    position: absolute;
    left: 98px;
    background-color: red;
    border: 1px solid red;
    border-radius: 12px;
    color: white;
    font: bold 9px/9px Helvetica, Verdana, Tahoma;
    height: 10px; 
    min-width: 8px;
    padding: 4px 3px 0 3px;
    line-height: 7px;
`

interface Rooms {
    room: {
        privateMessages: {
            [user: string]: {
                username: string
                socketId: string
                lastIdxChecked: number
                messages: []
            }
        },
        privateRoom: {
            username: string
        }
        privateRoomIsActive: boolean
        activeMissedToggle: boolean
    }
}

const PrivateTab = () => {
    const privateMessages = useSelector((state: Rooms) => state.room.privateMessages);
    const isPrivateRoomSelected = useSelector((state: Rooms) => state.room.privateRoom);
    const privateRoomActive = useSelector((state: Rooms) => state.room.privateRoomIsActive);
    const activeMissedMessage = useSelector((state: Rooms) => state.room.activeMissedToggle);
    const { username } = isPrivateRoomSelected;
    const dispatch = useDispatch();

    const openPrivateChat = (username: string, socketId: string) => {
        dispatch(privateRoomName({ username, socketId }));
        dispatch(activePrivateRoom(true));
        dispatch(missedMessages({ username }));

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
        dispatch(activeMissedMessageToggle(onlyMissedMsg));
    };
    
    return (
        <PrivateContainer>
            { privateMessages && Object.keys(privateMessages).map((user, idx) => {
                if ( username === privateMessages[user].username ) {
                    return (
                        <Username className={`${privateRoomActive && username === privateMessages[user].username ? 'active' : ''}`} onClick={() => openPrivateChat(privateMessages[user].username, privateMessages[user].socketId)} key={`${privateMessages[user].username}${idx}`}>
                            { privateMessages[user].username }
                            { typeof privateMessages[user].lastIdxChecked === 'number' &&
                            typeof privateMessages[user].lastIdxChecked === 'number' &&
                            <MissedMessageCounter>
                                { privateMessages[user].messages.length - privateMessages[user].lastIdxChecked <= 99 
                                    ? privateMessages[user].messages.length - privateMessages[user].lastIdxChecked
                                    : '99+' }
                            </MissedMessageCounter> 
                        }
                        </Username>
                    )
                }
                }) 
            }
        </PrivateContainer>
    )
}

export default PrivateTab;