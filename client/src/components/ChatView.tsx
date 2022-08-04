import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { privateRoomName } from "../app/reducer/roomSlice";
import Hamburger from "./Hamburger";
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
    // @media ( max-width: 768px ) {
    //     align-items: center;  
    // }
`

const TabsContainer = styled.div`
    display: flex;
    gap: 1rem;
    
`

interface Active {
    active: {}
}

const LobbyTitle = styled.h1<Active>`
    grid-area: room-title;
    display: flex;
    align-items: center;
    line-height: 1;
    padding-left: 1rem;
    margin: 0;
    padding: 1rem;
    color: white;
    background-color: ${({active}) => !active ? 'rgb(70, 70, 70)' : 'black'};
    cursor: pointer;
`

const Container = styled.div`  
    grid-area: messages-view;    
    display: flex;
    flex-direction: column;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(41, 41, 41);
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 7px;
        background: rgb(41,41,41);
      }
    &::-webkit-scrollbar-track {
        background: rgb(41,41,41);
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

interface Width {
    width: {
        dimension: number
    }
}

const ChatView = () => {
    const dispatch = useDispatch();
    const privateRoom = useSelector((state: Rooms) => state.room.privateRoom);
    const currentRoom = useSelector((state: Rooms) => state.room.currentRoom);
    const width = useSelector((state: Width) => state.width.dimension);
    
    const roomSelected = () => {
        dispatch(privateRoomName(''));
    }

    return (
        <Window>
            <TabsContainer>
                <LobbyTitle active={privateRoom} onClick={() => roomSelected()}>{currentRoom}</LobbyTitle>
                <>
                    <PrivateRoom />
                </>
                { width <= 768 && <Hamburger /> }
            </TabsContainer>
            <Container>
                <RoomMessages />
            </Container>
            <MessageInput />
        </Window>        
    )
}

export default ChatView;