import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import { User } from "../app/reducer/userSlice";
import socket from "../socket";

const RoomsContainer = styled.div`
    border: 1px solid black;
`

const Room = styled.button`

`

interface User {
    user: {
        username: string
    }
}

const Rooms = () => {
    const { username } = useSelector((state: User) => state.user)
    // const dispatch = useDispatch();

    const joinRoom = () => {
        socket.emit('join-room', username);
    }

    return (
        <RoomsContainer>
            <Room onClick={() => joinRoom()}>
                Test Room
            </Room>
        </RoomsContainer>
    )
}

export default Rooms;