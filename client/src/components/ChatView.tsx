import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { createPrivateRoom, privateRoomName } from "../app/reducer/roomSlice";
import { userSlice } from "../app/reducer/userSlice";
import MessageInput from "./MessageInput";
import PrivateRoom from "./PrivateRoom";
import RoomMessages from "./RoomMessages";

const Window = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    min-width: 300px;
    overflow: auto;
`

const TabsContainer = styled.div`
    display: flex;
    gap: 1rem;
`

const LobbyTitle = styled.h1`
    grid-area: room-title;
    display: flex;
    align-items: center;
    line-height: 1;
    padding-left: 1rem;
    margin: 0;
    padding: 1rem;
    color: white;
    background-color: black;
    cursor: pointer;
`

const Container = styled.div`  
    grid-area: messages-view;    
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: rgb(41, 41, 41);
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 7px;
      }
    &::-webkit-scrollbar-track {
        background: black;
      }
    &::-webkit-scrollbar-thumb {
        background: grey;
        border-radius: 5px;
      }
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
`

interface Rooms {
    room: {
        currentRoom: string
        createPrivateRoom: {}[]
        privateRoom: {}
        privateMessages: {}
    }
}

const ChatView = () => {
    const dispatch = useDispatch();
    const privateRoom = useSelector((state: Rooms) => state.room.privateRoom);
    const createdPrivate = useSelector((state: Rooms) => state.room.privateMessages)
    const currentRoom = useSelector((state: Rooms) => state.room.currentRoom);
    
    const roomSelected = () => {
        dispatch(privateRoomName(''));
    }

    return (
        <Window>
            <TabsContainer>
                <LobbyTitle onClick={() => roomSelected()}>{currentRoom}</LobbyTitle>
                <>
                    <PrivateRoom />
                </>
            </TabsContainer>
            <Container>
                {
                    <RoomMessages />
                }
            </Container>
            <MessageInput />
        </Window>        
    )
}

export default ChatView;