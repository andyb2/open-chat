import styled from "styled-components";
import MessageInput from "./MessageInput";
import UserList from "./UserList";

const Window = styled.div`
    display: grid;
    grid-template-areas: 'messages-view user-list'
                         'message-input user-list';
    grid-template-columns: 1fr 180px;
    grid-template-rows: 1fr 75px;
    border: 1px solid red;
`

const Messages = styled.div`
    grid-area: messages-view;
    border: 1px solid purple;
`

const ChatView = () => {
    return (
        <Window>
            <Messages>Messages Viewport</Messages>
            <UserList />
            <MessageInput />
        </Window>
        
    )
}

export default ChatView;