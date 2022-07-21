import styled from "styled-components";
import ChatView from "../components/ChatView";
import Rooms from "../components/Rooms";

const Grid = styled.div`
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-columns: 200px 1fr;
`

const Chat = () => {
    console.log(`CHAT PAGE RAN`)
    return (
        <Grid>
            <Rooms />
            <ChatView />
        </Grid>
    )
}

export default Chat;