import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import MessageInput from "./MessageInput";

const Window = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    min-width: 300px;
    overflow: auto;
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
`

const Container = styled.div`  
    grid-area: messages-view;    
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: rgb(41, 41, 41);
    overflow-y: scroll;
`

const Message = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.2rem;
`
const Box = styled.div`
    display: flex;
    gap: 0.5rem;
    min-width: 150px;

`
const Sender = styled.div`
    color: ${(props) => props.color};
    font-size: 14px;
    padding-left: 0.5rem;
`

const Time = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
`

const Content = styled.div`
    padding:  0.1rem 1rem 0.1rem 1rem;
    overflow-wrap: break-word;
    font-size: 12px;
`

const ScrollToBottom = styled.div``

interface Chat {
    room: {
        chat: {
            map(arg0: (item: {
                sender: string,
                color: string,
                content: string,
                timeStamp: string
            }, idx: number) => JSX.Element): import("react").ReactNode;
        }
    }
}

interface CurrentRoom {
    room: {
        currentRoom: string
    }
}

const ChatView = () => {
    const chat = useSelector((state: Chat) => state.room.chat);
    const currentRoom = useSelector((state: CurrentRoom) => state.room.currentRoom);
    const messageRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        messageRef.current?.scrollIntoView();
    }, [chat]);

    return (
        <Window>
            <LobbyTitle>{currentRoom}</LobbyTitle>
            <Container>
                { chat &&
                    chat.map(({ sender, color, timeStamp, content }, idx) => {
                        return (
                            <Message key={idx}>
                                <Box>
                                    <Sender color={color}>
                                        { sender }
                                    </Sender>
                                    <Time>
                                        { timeStamp }
                                    </Time>
                                </Box>
                                <Content>
                                    { content }
                                </Content>
                            </Message>
                        )
                    })
                }
                <ScrollToBottom ref={messageRef}/>
            </Container>
            <MessageInput />
        </Window>        
    )
}

export default ChatView;