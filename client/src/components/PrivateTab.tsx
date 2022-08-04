import { useSelector, useDispatch } from "react-redux";
import { privateRoomName, activePrivateRoom } from "../app/reducer/roomSlice";
import styled from "styled-components";

const PrivateContainer = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 1rem;
`

const Username = styled.div`
    padding: 0.5rem;
    color: white;
    font-size: 15px;
    width: 90px;
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
        background-color: rgb(30, 30, 30);
    }
    @media (max-width: 400px) {
        padding: 0.2rem;
    }
`

interface Rooms {
    room: {
        privateMessages: {
            [user: string]: {
                username: string
                socketId: string
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
    };
    
    return (
        <PrivateContainer>
            { privateRooms && Object.keys(privateRooms).map((user, idx) => {
                if ( username === privateRooms[user].username ) {
                    return (
                        <Username className={`${privateRoomActive && username === privateRooms[user].username ? 'active' : ''}`} onClick={() => openPrivateChat(privateRooms[user].username, privateRooms[user].socketId)} key={`${privateRooms[user].username}${idx}`}>
                            { privateRooms[user].username }
                        </Username>
                    )
                }
                }) 
            }
        </PrivateContainer>
    )
}

export default PrivateTab;