import { useSelector, useDispatch } from "react-redux";
import { privateRoomName } from "../app/reducer/roomSlice";
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
    border: 1px solid grey;
    border-bottom: none;
    cursor: pointer;
    background-color: 'black';
    &.active {
        border: 1px solid rgb(70, 70, 70);
        background-color: rgb(70, 70, 70);
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
    }
}

const PrivateRoom = () => {
    const privateRooms = useSelector((state: Rooms) => state.room.privateMessages);
    const isPrivateRoomSelected = useSelector((state: Rooms) => state.room.privateRoom);
    const { username } = isPrivateRoomSelected;
    const dispatch = useDispatch();

    const openPrivateChat = (username: string, socketId: string) => {
            dispatch(privateRoomName({ username, socketId }));
    };
    
    return (
        <PrivateContainer>
            { privateRooms && Object.keys(privateRooms).map((user, idx) => {
                if ( username === privateRooms[user].username ) {
                    return (
                        <Username className={`${username === privateRooms[user].username ? 'active' : ''}`} onClick={() => openPrivateChat(privateRooms[user].username, privateRooms[user].socketId)} key={`${privateRooms[user].username}${idx}`}>
                            { privateRooms[user].username }
                        </Username>
                    )
                }
                }) 
            }
        </PrivateContainer>
    )
}

export default PrivateRoom;