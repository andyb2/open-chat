import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { roomsList } from "../roomList";
import { joinedRoom, activePrivateRoom, activeMissedMessageToggle } from "../app/reducer/roomSlice";
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

const RoomToggle = styled.div`
    cursor: pointer;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    padding: 1rem;
    text-align: center;
    width: 80%;
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

const Dm = styled.div`
    cursor: pointer;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    padding: 1rem;
    text-align: center;
    width: 80%;
    &.active {
        animation: fadeInOut 2s infinite;
    }
    @keyframes fadeInOut {
        0% {
            color: none;
        }
        50% {
            color: red;
        }
        100% {
            color: none;
        }
    }
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
        activeMissedToggle: boolean 
        privateMessages: {
            [user: string]: {
                lastIdxChecked: number | boolean
            }
        }
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
    const width = useSelector((state: Width) => state.width.dimension);
    const activeMissedMessage = useSelector((state: Room) => state.room.activeMissedToggle);
    const privateMessages = useSelector((state: Room) => state.room.privateMessages);
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
        if (Object.keys(privateMessages).length) {
            setDmActive(prev => !prev);
            dispatch(activeMissedMessageToggle(false));
        }
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
    }, [currentRoom]);

    useEffect(() => {
        const findMissedMessages = () => {
            for (const user in privateMessages) {
                if ( typeof privateMessages[user].lastIdxChecked === 'number') {
                    dispatch(activeMissedMessageToggle(true));
                    break;
                }
            }
        }
        findMissedMessages();
        if(!Object.keys(privateMessages).length) {
            setDmActive(false);
        } 
    }, [privateMessages])

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
                <Dm className={`${ activeMissedMessage ? 'active' : ''}`} onClick={() => showPrivateMessages()}>
                    Private Messages
                </Dm>
                <RoomList active={dmActive}>
                    { 
                        dmActive && <DirectMessages />
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