import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Welcome = styled.h1`
    margin: 0;
    padding: 1rem 0 1rem 1rem;
    font-size: 25px;
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
        currentRoom: string
    }
}

interface PrivateRoom {
    room: {
        privateRoom: {
            username: string
        }
        privateMessages: {
            [activePrivateRoom: string]: {
                username: string
                messages: []
            }
        }
    }
}

const RoomMessages = () => {
    const chatRoom = useSelector((state: Chat) => state.room.chat);
    const activePrivateRoom = useSelector((state: PrivateRoom) => state.room.privateRoom);
    const privateMessages = useSelector((state: PrivateRoom) => state.room.privateMessages);
    const currentRoom = useSelector((state: Chat) => state.room.currentRoom);
    const messageRef = useRef<HTMLInputElement>(null);
    const chat = activePrivateRoom ? privateMessages[activePrivateRoom.username].messages : chatRoom;

    useEffect(() => {
        messageRef.current?.scrollIntoView();
    }, [chat]);

    return (
        <>
        <Welcome>{`${activePrivateRoom ? `Chatting with ${activePrivateRoom.username}`: `Welcome to ${currentRoom}`}`}</Welcome>
        { 
            chat &&
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
        </>
    )
}

export default RoomMessages;