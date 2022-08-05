import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { activePrivateRoom, mobileViewSidebarToggle } from "../app/reducer/roomSlice";
import Hamburger from "./Hamburger";
import MessageInput from "./MessageInput";
import PrivateTab from "./PrivateTab";
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
    // width: 100%;
`

interface Active {
    active: {}
}

const LobbyTitle = styled.h1<Active>`
    grid-area: room-title;
    display: flex;
    align-items: center;
    line-height: 1;
    white-space: nowrap;
    margin: 0;
    padding: 1rem;
    color: white;
    background-color: ${({ active }) => active ? 'rgb(70, 70, 70)' : 'black'};
    cursor: pointer;
    &:hover {
        background-color: ${({ active }) => active ? 'rgb(70, 70, 70)' : 'rgb(30, 30, 30)'};
    }
    @media (max-width: 400px) {
        font-size: 20px;
        padding: 0.5rem;
    }
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

const Spacer = styled.div`
      display: flex;
      justify-content: space-between;
      width: 100%;
`

interface Rooms {
    room: {
        currentRoom: string
        createPrivateRoom: {}[]
        privateRoom: {}
        privateMessages: {}
        privateRoomIsActive: boolean
        mobile: boolean
    }
}

interface Width {
    width: {
        dimension: number
    }
}

const ChatView = () => {
    const dispatch = useDispatch();
    const currentRoom = useSelector((state: Rooms) => state.room.currentRoom);
    const mobile = useSelector((state: Rooms) => state.room.mobile);
    const width = useSelector((state: Width) => state.width.dimension);
    const privateRoomIsActive = useSelector((state: Rooms) => state.room.privateRoomIsActive);

    const roomSelected = () => {
        dispatch(activePrivateRoom(false));
    }

    const tapChatviewToCloseMobileSidebar = () => {
        dispatch(mobileViewSidebarToggle(!mobile))
    }

    return (
        <Window>
            <TabsContainer>
                <LobbyTitle active={!privateRoomIsActive} onClick={() => roomSelected()}>{currentRoom}</LobbyTitle>
                <Spacer>
                    <PrivateTab />
                    { width <= 768 && <Hamburger /> }
                </ Spacer>
            </TabsContainer>
            <Container onClick={width <= 768 ? () => tapChatviewToCloseMobileSidebar() : undefined}>
                <RoomMessages />
            </Container>
            <MessageInput />
        </Window>        
    )
}

export default ChatView;