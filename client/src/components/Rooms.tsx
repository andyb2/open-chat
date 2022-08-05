import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { roomsList } from "../roomList";
import { joinedRoom, activePrivateRoom } from "../app/reducer/roomSlice";
import socket from "../socket";
import { findAndRemoveUser } from "../helperFunctions";
import Logo from "./Logo";
import DirectMessages from "./DirectMessages";
import UserList from "./UserList";

interface Mobile {
    mobileView: boolean
}

const RoomsContainer = styled.nav<Mobile>`
    grid-area: room-container;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.5rem;
    @media (max-width: 768px) {
        display: none;
        display: ${({ mobileView }) => mobileView ? 'flex' : ''};
        position: fixed;
        right: 0;
        height: calc(100% - 128px);
        top: 65px;
        z-index: 100;
        background-color: black;
        width: 195px;
    }
    @media (max-width: 400px) {
        display: ${({ mobileView }) => mobileView ? 'flex' : ''};
        top: 49px;
        height: calc(100% - 112px);
    }
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
    overflow: auto;
    &.active {
        background-color: rgb(70, 70, 70);
    }
    &:hover {
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
    width: 85%;
    margin-top: 0.5rem;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    &::-webkit-scrollbar {
        width: 5px;
        background: rgb(41,41,41);
      }
    &::-webkit-scrollbar-track {
        background: black;
        border-radius: 10px;
      }
    &::-webkit-scrollbar-thumb {
        background: grey;
        border-radius: 5px;
      }
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
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
    padding: 0.5rem;
`

const UserContainer = styled.div`
    width: 100%;
`

const UserToggle = styled.div`
    cursor: pointer;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    padding: 1rem;
    text-align: center;
    width: 80%;
`

const Users = styled.div<Active>`
    display: ${(props) => props.active ? 'flex' : 'none'};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    // padding: 1rem;
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
        mobile: boolean
    }
}

interface Width {
    width: {
        dimension: number
    }
}

const Rooms = () => {
    const user = useSelector((state: User) => state.user)
    const previousRoom = useSelector((state: Room) => state.room.previousRoom);
    const currentRoom = useSelector((state: Room) => state.room.currentRoom);
    const mobileView = useSelector((state: Room) => state.room.mobile);
    const width = useSelector((state: Width) => state.width.dimension)
    const [ roomActive, setRoomActive ] = useState(false);
    const [ dmActive, setDmActive ] = useState(false);
    const [ usersActive, setUsersActive] = useState(false)
    
    const dispatch = useDispatch();
    
    const joinRoom = (room: string) => {
        if ( currentRoom !== room ) {
            dispatch(joinedRoom(room));
        }
        dispatch(activePrivateRoom(false));
    }

    const showPrivateMessages = () => {
        setDmActive(prev => !prev);
    }
    
    const showRoomsList = () => {
        setRoomActive(prev => !prev);
    }
    
    const showUsers = () => {
        setUsersActive(prev => !prev);
    }
    useEffect(() => {
        if ( previousRoom !== '' ){
            const updateUserList = findAndRemoveUser();
            socket.emit('remove-room-user', { previousRoom, updateUserList });
            socket.emit('join-room', { user, currentRoom });
        }
    }, [currentRoom])

    return (
        <RoomsContainer mobileView={mobileView}>
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
                { width <= 768 &&
                    <UserContainer>
                        <UserToggle onClick={() => showUsers()}>
                            Users
                        </UserToggle>
                        <Users active={usersActive}>
                            <UserList />
                        </Users>
                    </UserContainer>
                }
            </Box>
        </RoomsContainer>
    )
}

export default Rooms;