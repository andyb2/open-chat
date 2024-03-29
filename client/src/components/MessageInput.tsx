import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import socket from "../socket";
import { useDispatch, useSelector } from "react-redux";
import Picker from "emoji-picker-react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import './picker.css';
import { messages } from "../app/reducer/roomSlice";

const MessageParent = styled.div`
    grid-area: message-input;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0.1rem 1rem 0.1rem;
`

const DeliveryContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    @media ( max-width: 768px ) {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }
`

const Form = styled.form`
    display: flex;
    width: 100%;
    max-width: 500px;
    min-width: 200px;
`

const Input = styled.input`
    width: 100%;
    padding: 0 0 0 1rem;
    border: none;
    border: 1px 0 1px 1px;
    border-radius: 25px 0 0 25px;
    background-color: rgb(50, 50, 50);
    color: white;
    &:focus {
        outline: none;
    }
    @media ( max-width: 900px ) {
        border-radius: 25px 25px 25px 25px;
        padding: 0.5rem 0.5rem 0.5rem 1rem;
    }
`

const Emoji = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px 1px 1px 0;
    border-radius: 0 25px 25px 0;
    padding: 0.5rem;
    background-color: rgb(50, 50, 50);
    cursor: pointer;
`

interface BoxProps {
    active: boolean
}

const Box = styled.div<BoxProps>`
    height: 250px;
    max-height: 0;
    transition: max-height 0.25s ease-out;
    overflow: hidden;
    ${(props) => props.active && css`
        height: 250px;
        max-height: 250px;
        transition: max-height 0.25s ease-in;
    `}
`

const emojiCategories = {
    food_drink: false,
    travel_places: false,
    activities: false,
    objects: false,
    symbols: false,
    flags: false,
}

interface Room {
    room: {
        currentRoom: string
        privateRoom: {
            socketId: string
        }
        privateRoomIsActive: boolean
        mobile: boolean
    }
}

interface User {
    user: {
        username: string
    }
}

interface Width {
    width: {
        dimension: number
    }
}

const errors = {
    maxLength: {
        value: 500,
        message: 'Message length is too long',
    },
}

const MessageInput = () => {
    const [ renderPicker, setRenderPicker ] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, setValue, getValues, setFocus } = useForm();
    const messageInput = register('message', errors);
    const currentRoom = useSelector((state: Room) => state.room.currentRoom);
    const activePrivateRoom = useSelector((state: Room) => state.room.privateRoom);
    const width = useSelector((state: Width) => state.width.dimension);
    const user = useSelector((state: User) => state.user);
    const privateRoomIsActive = useSelector((state: Room) => state.room.privateRoomIsActive);

    const onSubmit = handleSubmit(({ message }) => {
        const timeOfMessage = moment().format("MMM Do, YYYY h:mm A");
        if (message.trim() !== '') {
            if( privateRoomIsActive) {
                socket.emit('private-message', { 
                    message,
                    room: activePrivateRoom,
                    user, 
                    timeOfMessage,
                    sender: socket.id,
                });
                dispatch(messages({ message, user, timeOfMessage, privateMessage: true, activePrivateRoom}));
            } else {
                socket.emit('new-message', { 
                    message,
                    room: currentRoom,
                    user, 
                    timeOfMessage,
                });
            } 
        }
        reset({message: ''});
        setRenderPicker(false);
    })

    const selectedEmoji = (event: {}, emojiObject: { emoji: string }) => {
        const inputValue = getValues('message');
        setValue('message', `${inputValue}${emojiObject.emoji}`);
        setFocus('message');
    }

    const activatePicker = () => {
        setRenderPicker(prev => !prev);
    }

    useEffect(()=> {
        if (width > 769) {
            setFocus('message');
        }
    },[currentRoom, activePrivateRoom, privateRoomIsActive]);

    return (
        <MessageParent>
            <DeliveryContainer>
                <Form onSubmit={onSubmit}>
                    <Input 
                        {...messageInput}
                        ref={(e) => {
                            messageInput.ref(e);
                            inputRef.current = e
                        }}
                        autoComplete='off'
                    />
                    { width >= 900 && <Emoji onClick={() => activatePicker()}> <FontAwesomeIcon icon={ faFaceSmile }/> </Emoji> }
                </Form>
                {   
                    width >= 900 &&
                        <Box active={renderPicker}>
                            <Picker onEmojiClick={selectedEmoji} preload={true} pickerStyle={{height: '100%'}} groupVisibility={emojiCategories} />
                        </Box> 
                }
            </DeliveryContainer>
        </MessageParent>
    )
}

export default MessageInput;