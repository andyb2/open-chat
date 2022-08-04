import { useSelector } from "react-redux";
import styled from "styled-components";
import ChatView from "../components/ChatView";
import Rooms from "../components/Rooms";
import UserList from "../components/UserList";

const Grid = styled.div`
    display: grid;
    grid-template-areas: 'room-container messages-view user-list';
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: 1fr;
    height: 100%;
    width: 100%;
    max-width: 1200px;
    @media (max-width: 768px) {
        grid-template-areas: 'messages-view';
        grid-template-columns: 1fr;
    }
`

interface Width {
    width: {
        dimension: number
    }
}

const Chat = () => {
    const width = useSelector((state: Width) => state.width.dimension)
    return (
        <Grid>
            <Rooms />
            <ChatView />
            { width >= 768 && <UserList /> }
        </Grid>
    )
}

export default Chat;