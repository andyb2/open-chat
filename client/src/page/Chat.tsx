import styled from "styled-components";
import ChatView from "../components/ChatView";
import Rooms from "../components/Rooms";
import UserList from "../components/UserList";

const Grid = styled.div`
    display: grid;
    grid-template-areas: 'room-container messages-view user-list';
    grid-template-columns: 200px 1fr 200px;
    height: 100%;
    width: 100%;
`

const Chat = () => {
    return (
        <Grid>
            <Rooms />
            <ChatView />
            <UserList />
        </Grid>
    )
}

export default Chat;