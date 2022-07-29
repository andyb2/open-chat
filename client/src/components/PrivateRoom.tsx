import { useSelector, useDispatch } from "react-redux";
import { privateRoomName } from "../app/reducer/roomSlice";
import styled from "styled-components";

const PrivateContainer = styled.div`
    display: flex;
    // justify-content: center;
    align-items: flex-end;
    gap: 1rem;
`

const Username = styled.h1`
    padding: 0.5rem;
    color: white;
    font-size: 15px;
    margin: 0;
    border: 1px solid grey;
    border-bottom: none;
    border-radius: 10px 10px 0 0;
    cursor: pointer;
`

interface Rooms {
    room: {
        privateMessages: {
            [user: string]: {
                username: string
                socketId: string
            }
        }
    }
}

const PrivateRoom = () => {
    const privateRooms = useSelector((state: Rooms) => state.room.privateMessages);
    const dispatch = useDispatch();

    const openPrivateChat = (username: string, socketId: string) => {
            dispatch(privateRoomName({ username, socketId }));
    };
    console.log(`PRORPORORPRPRPR`, privateRooms)
    return (
        <PrivateContainer>
            { privateRooms && Object.keys(privateRooms).map((user, idx) => {
                    return (
                        <Username onClick={() => openPrivateChat(privateRooms[user].username, privateRooms[user].socketId)} key={`${privateRooms[user].username}${idx}`}>
                            { privateRooms[user].username }
                        </Username>
                    )
                }) 
            }
        </PrivateContainer>
    )
}

export default PrivateRoom;