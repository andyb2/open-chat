import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { roomsList } from "../roomList";
import { joinedRoom } from "../app/reducer/roomSlice";
// import { User } from "../app/reducer/userSlice";
import socket from "../socket";
import { findAndRemoveUser } from "../helperFunctions";

const RoomsContainer = styled.nav`
    grid-area: room-container;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    const dispatch = useDispatch();
    console.log(`[ROOMS]: componenet rendered`)
    const joinRoom = (room: string) => {
        dispatch(joinedRoom(room));
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
            {   roomsList.map((room) => {
                    return (
                        <Room onClick={() => joinRoom(room)} key={room}>
                            { room }
                        </Room>
                    )
                })
            }
        </RoomsContainer>
    )
}

export default Rooms;