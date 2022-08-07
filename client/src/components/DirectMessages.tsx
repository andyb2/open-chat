import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { privateRoomName, activePrivateRoom, missedMessages, deletePrivateMessage } from "../app/reducer/roomSlice";

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    // font-size: 13px;
    width: 100%;
`

const Dm = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 10px;
    font-family: Arial;
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
    @media (max-width: 769px) {
        font-size: 12px;
        padding: 0.7rem;
    }
`

const Username = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

const MissedMessageCounter = styled.div`
    position: absolute;
    left: 125px;
    background-color: red;
    border: 1px solid red;
    border-radius: 12px;
    color: white;
    font: bold 9px/9px Helvetica, Verdana, Tahoma;
    height: 11px; 
    min-width: 10px;
    padding: 4px 3px 0 3px;
    line-height: 7px;
    @media (max-width: 769px) {
        left: 116px;
    }
`

const Xmark = styled.div`
    color: white;
    position: absolute;
    height: 17px;
    width: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    &:hover {
        color: rgb(40, 40, 40);
        font-size: 20px;
    }
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

interface Width {
    width: {
        dimension: number
    }
}

const DirectMessages = () => {
    const privateMessages = useSelector((state: Room) => state.room.privateMessages);
    const privateRoom = useSelector((state: Room) => state.room.privateRoom);
    const privateRoomIsActive = useSelector((state: Room) => state.room.privateRoomIsActive);
    const { username } = privateRoom;
    const dispatch = useDispatch();
    
    const renderExisitingPrivateChat = (username: string, socketId: string) => {
        dispatch(privateRoomName({ username, socketId }));
        dispatch(activePrivateRoom(true));
        dispatch(missedMessages({ username }));
    }

    const closePrivateChat = (e: any, user: string) => {
        e.stopPropagation();
        dispatch(deletePrivateMessage(user))
        dispatch(activePrivateRoom(false));
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
                            <Xmark onClick={(e) => closePrivateChat(e, user)}>
                                <FontAwesomeIcon icon={faXmark} size={'1x'}/>
                            </Xmark>
                            <Username>
                                { privateMessages[user].username }
                            </Username>
                        { typeof privateMessages[user].lastIdxChecked === 'number' &&
                            <MissedMessageCounter>
                                { privateMessages[user].messages.length - privateMessages[user].lastIdxChecked <= 99 
                                    ? privateMessages[user].messages.length - privateMessages[user].lastIdxChecked
                                    : '99+' }
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