import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
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
    display: flex;
    flex-wrap: wrap;
    // position: relative;
    grid-area: messages-view;
    border: 1px solid purple;
    // overflow-y: scroll;
    // overflow-x: visible;
    max-width: 1000px;
    max-height: 92vh;
`

const Message = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.2rem;
`

const Sender = styled.div`
    font-family: Ariel;
`

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
`

const ScrollToBottom = styled.div`

`

interface Chat {
    room: {
        chat: {
            map(arg0: (item: {
                sender: string,
                content: string
            }, idx: number) => JSX.Element): import("react").ReactNode;
        }
    }
}

const ChatView = () => {
    const chat = useSelector((state: Chat) => state.room.chat)
    const messageRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messageRef.current?.scrollIntoView();
    }, [chat])

    return (
        <Window>
            <Messages>
                { chat &&
                    chat.map((item, idx) => {
                        return (
                            <Message key={idx}>
                                <Sender>
                                    { item.sender }
                                </Sender>
                                <Content>
                                    { item.content }
                                </Content>
                            </Message>
                        )
                    })
                }
                <ScrollToBottom ref={messageRef}/>
            </Messages>
            <UserList />
            <MessageInput />
        </Window>
        
    )
}

export default ChatView;