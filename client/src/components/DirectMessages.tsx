import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { privateRoomName } from "../app/reducer/roomSlice";

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    font-size: 13px;
    width: 100%;
`

const Dm = styled.button`
    border-radius: 10px;
    font-family: Arial;
    // font-size: 12px;
    text-align: center;
    border: 1px solid rgb(41, 41, 41);
    background-color: rgb(41, 41, 41);
    padding: 1rem;
    color: white;
    cursor: pointer;
    width: 100%;
    &.active {
        background-color: rgb(70, 70, 70);
    }
`

interface Room {
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

const DirectMessages = () => {
    const privateMessages = useSelector((state: Room) => state.room.privateMessages);
    const activePrivateRoom = useSelector((state: Room) => state.room.privateRoom);
    const { username } = activePrivateRoom;
    const dispatch = useDispatch();

    const renderExisitingPrivateChat = (username: string, socketId: string) => {
        dispatch(privateRoomName({ username, socketId }));
    }

    return (
        <Box>
            {
                Object.keys(privateMessages).map((user, idx) => {
                    return (
                        <Dm className={`${username === privateMessages[user].username ? 'active' : ''}`} 
                            key={`${privateMessages[user].username}-${idx}`}
                            onClick={() => renderExisitingPrivateChat(privateMessages[user].username, privateMessages[user].socketId)}
                        >
                            { privateMessages[user].username }
                        </Dm>
                    )
                })
            }
        </Box>
    )
}

export default DirectMessages;