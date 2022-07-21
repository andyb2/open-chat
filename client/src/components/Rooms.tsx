import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { roomsList } from "../roomList";
import { joinedRoom } from "../app/reducer/roomSlice";
// import { User } from "../app/reducer/userSlice";
import socket from "../socket";
import { findAndRemoveUser } from "../helperFunctions";

const RoomsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.1rem;
`

const Room = styled.button`
    border: none;
    border: 1px solid grey;
    background-color: white;
    padding: 1rem;
`

export interface User {
    user: {
        username: string
    }
}

// interface PreviousRoom {
//     room: {
//         previousRoom: string
//     }
// }

// export interface RoomUsers {
//     room: {
//         roomUsers: string[]
//     }
// }

interface Room {
    room: {
        previousRoom: string
        currentRoom: string
        roomUsers: string[]
    }
}

const Rooms = () => {
    const username = useSelector((state: User) => state.user.username)
    const previousRoom = useSelector((state: Room) => state.room.previousRoom);
    const currentRoom = useSelector((state: Room) => state.room.currentRoom);
    const dispatch = useDispatch();

    const joinRoom = (room: string) => {
        dispatch(joinedRoom(room));
    }

    useEffect(() => {
        if ( previousRoom !== '' ){
            const updateUserList = findAndRemoveUser();
            socket.emit('remove-room-user', { previousRoom, updateUserList });
            socket.emit('join-room', { username, currentRoom });
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