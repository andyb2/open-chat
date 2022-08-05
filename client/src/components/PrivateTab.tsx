import { useSelector, useDispatch } from "react-redux";
import { privateRoomName, activePrivateRoom, missedMessages } from "../app/reducer/roomSlice";
import styled from "styled-components";

const PrivateContainer = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 1rem;
`

const Username = styled.div`
    display: flex;
    padding: 0.5rem;
    background-color: rgb(20, 20, 20);
    color: white;
    gap: 0.2rem;
    font-size: 15px;
    text-align: center;
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
    // position: absolute;
    // left: 220px;
    // top: 25px;
    border: 1px solid red;
    width: 16px;
    padding: 0.1rem;
    background: red;
    font-size 12px;
    border-radius: 100px;
    color: white;
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
    }
}

const PrivateTab = () => {
    const privateRooms = useSelector((state: Rooms) => state.room.privateMessages);
    const isPrivateRoomSelected = useSelector((state: Rooms) => state.room.privateRoom);
    const privateRoomActive = useSelector((state: Rooms) => state.room.privateRoomIsActive)
    const { username } = isPrivateRoomSelected;
    const dispatch = useDispatch();

    const openPrivateChat = (username: string, socketId: string) => {
        dispatch(privateRoomName({ username, socketId }));
        dispatch(activePrivateRoom(true));
        dispatch(missedMessages({ username }));
    };
    
    return (
        <PrivateContainer>
            { privateRooms && Object.keys(privateRooms).map((user, idx) => {
                if ( username === privateRooms[user].username ) {
                    return (
                        <Username className={`${privateRoomActive && username === privateRooms[user].username ? 'active' : ''}`} onClick={() => openPrivateChat(privateRooms[user].username, privateRooms[user].socketId)} key={`${privateRooms[user].username}${idx}`}>
                            { privateRooms[user].username }
                            { typeof privateRooms[user].lastIdxChecked === 'number' &&
                            <MissedMessageCounter>
                                { privateRooms[user].messages.length - privateRooms[user].lastIdxChecked }
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