import { useSelector, useDispatch } from "react-redux";
import { privateRoom } from "../app/reducer/roomSlice";
import styled from "styled-components";

const PrivateContainer = styled.div`
    display: flex;
    // justify-content: center;
    align-items: flex-end;
`

const Username = styled.h1`
    padding: 0.5rem;
    color: white;
    font-size: 15px;
    margin: 0;
    border: 1px solid grey;
    border-bottom: none;
    border-radius: 10px 10px 0 0;
`

interface Rooms {
    room: {
        privateRooms: {
            map(arg0: (room: {
                username: string,
            }, idx: number) => JSX.Element): import("react").ReactNode;
        }
    }
}


const PrivateRoom = () => {
    const privateRooms = useSelector((state: Rooms) => state.room.privateRooms);
    const dispatch = useDispatch();

    const openPrivateChat = (username: string) => {
        dispatch(privateRoom(username));
    };

    return (
        <PrivateContainer>
            { Object.keys(privateRooms).map((username, idx) => {
                    return (
                        <Username onClick={() => openPrivateChat(username)} key={`${username}${idx}`}>
                            { username }
                        </Username>
                    )
                }) 
            }
        </PrivateContainer>
    )
}

export default PrivateRoom;