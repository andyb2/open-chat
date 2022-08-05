import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { privateRoomName, activePrivateRoom, missedMessages } from "../app/reducer/roomSlice";

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    font-size: 13px;
    width: 100%;
`

const Dm = styled.button`
    display: flex;
    justify-content: center;
    // gap: 1rem;
    border-radius: 10px;
    font-family: Arial;
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
    &:hover {
        background-color: rgb(70, 70, 70);
    }
`

const MissedMessageCounter = styled.div`
    position: absolute;
    left: 155px;
    // top: 217px;
    border: 1px solid red;
    padding: 0.1rem;
    width: 15px;
    background: red;
    font-size 12px;
    border-radius: 100px;
    color: white;
`

interface Room {
    room: {
        privateMessages: {
          [user: string]: {
            username: string
            socketId: string
            lastIdxChecked: number
            messages: []
          }
        }
        privateRoom: {
            username: string
        }
        privateRoomIsActive: boolean
    }
}

const DirectMessages = () => {
    const privateMessages = useSelector((state: Room) => state.room.privateMessages);
    const privateRoom = useSelector((state: Room) => state.room.privateRoom);
    const privateRoomIsActive = useSelector((state: Room) => state.room.privateRoomIsActive)
    const { username } = privateRoom;
    const dispatch = useDispatch();
    
    const renderExisitingPrivateChat = (username: string, socketId: string) => {
        dispatch(privateRoomName({ username, socketId }));
        dispatch(activePrivateRoom(true));
        dispatch(missedMessages({ username }));
    }

    return (
        <Box>
            {
                Object.keys(privateMessages).map((user, idx) => {
                    return (
                        <Dm className={`${privateRoomIsActive && username === privateMessages[user].username ? 'active' : ''}`} 
                            key={`${privateMessages[user].username}-${idx}`}
                            onClick={() => renderExisitingPrivateChat(privateMessages[user].username, privateMessages[user].socketId)}
                        >
                            { privateMessages[user].username }
                        { typeof privateMessages[user].lastIdxChecked === 'number' &&
                            <MissedMessageCounter>
                                { privateMessages[user].messages.length - privateMessages[user].lastIdxChecked }
                            </MissedMessageCounter>
                        }
                        </Dm>
                    )
                })
            }
        </Box>
    )
}

export default DirectMessages;