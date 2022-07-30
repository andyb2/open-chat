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
    overflow: auto;
    gap: 0.5rem;
`

interface RoomActive {
    [room: string]: {}
}

const Room = styled.button<RoomActive>`
    border-radius: 10px;
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

const RoomToggle = styled.div`
    cursor: pointer;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    padding: 1rem;
    text-align: center;
    width: 80%;
`

const Dm = styled.div`
    cursor: pointer;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    padding: 1rem;
    text-align: center;
    width: 80%;
`

const Box = styled.div`
    width: 100%;
    margin-top: 1rem;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    // gap: 1rem;
`

interface Active {
    active: boolean
}

const RoomList = styled.div<Active>`
    display: ${(props) => props.active ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
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
    const [ roomActive, setRoomActive ] = useState(false);
    const [ dmActive, setDmActive ] = useState(false);
    
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
            <Box>
                <RoomToggle onClick={() => showRoomsList()}>
                    Rooms
                </RoomToggle>
                <RoomList active={roomActive}>
                    {   
                        roomActive &&
                            roomsList.map((room) => {
                                return (
                                    <Room className={`${currentRoom === room ? 'active' : ''}`} onClick={() => joinRoom(room)} key={room}>
                                        { room }
                                    </Room>
                                )
                            })
                    }
                </RoomList>
                <Dm onClick={() => showPrivateMessages()}>
                    Private Messages
                </Dm>
                <RoomList active={dmActive}>
                    { 
                        dmActive &&
                            <DirectMessages />
                    }
                </RoomList>
            </Box>
        </RoomsContainer>
    )
}

export default Rooms;