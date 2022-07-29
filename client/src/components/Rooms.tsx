import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { roomsList } from "../roomList";
import { joinedRoom } from "../app/reducer/roomSlice";
import socket from "../socket";
import { findAndRemoveUser } from "../helperFunctions";
import Logo from "./Logo";
import DirectMessages from "./DirectMessages";

const RoomsContainer = styled.nav`
    grid-area: room-container;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    gap: 1rem;
    padding-left: 1rem;
`

interface Active {
    active: boolean
}

const Room = styled.button`
    border-radius: 10px;
    border: 1px solid rgb(41, 41, 41);
    background-color: rgb(41, 41, 41);
    padding: 1rem;
    color: white;
    cursor: pointer;
    width: 100%;
`

const RoomList = styled.div`
    cursor: pointer;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    border-radius: 3px;
    padding: 1rem;
    text-align: center;
    width: 90%;
`

const DirectMessagesContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Dm = styled.div`
    cursor: pointer;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    border-radius: 3px;
    padding: 1rem;
    text-align: center;
    width: 90%;
`

const Box = styled.div`
    // border: 1px solid white;
    width: 100%;
    margin-top: 1rem;
`


export interface User {
    user: {
        username: string
        color: string
    }
}

interface Room {
    room: {
        previousRoom: string
        currentRoom: string
        roomUsers: {}[]
    }
}

const Rooms = () => {
    const user = useSelector((state: User) => state.user)
    const previousRoom = useSelector((state: Room) => state.room.previousRoom);
    const currentRoom = useSelector((state: Room) => state.room.currentRoom);
    const [ dmActive, setDmActive ] = useState(false);
    const [roomActive, setRoomActive] = useState(false);
    
    const dispatch = useDispatch();
    
    const joinRoom = (room: string) => {
        if ( currentRoom !== room ) {
            dispatch(joinedRoom(room));
        }
    }

    const showPrivateMessages = () => {
        setDmActive(prev => !prev);
    }
    
    const showRoomsList = () => {
        setRoomActive(prev => !prev);
    }

    useEffect(() => {
        if ( previousRoom !== '' ){
            const updateUserList = findAndRemoveUser();
            socket.emit('remove-room-user', { previousRoom, updateUserList });
            socket.emit('join-room', { user, currentRoom });
        }
    }, [currentRoom])

    return (
        <RoomsContainer>
            <Logo />
            <RoomList onClick={() => showRoomsList()}>
                Rooms
            </RoomList>
            {   
                roomActive &&
                    roomsList.map((room) => {
                        return (
                            <Room onClick={() => joinRoom(room)} key={room}>
                                { room }
                            </Room>
                        )
                    })
            }
            <DirectMessagesContainer>
                <Dm onClick={() => showPrivateMessages()}>
                    Private Messages
                </Dm>
                { 
                    dmActive &&
                        <Box>
                            <DirectMessages />
                        </Box> 
                }
            </DirectMessagesContainer>
        </RoomsContainer>
    )
}

export default Rooms;