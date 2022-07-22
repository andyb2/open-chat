import { useRef, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import socket from "../socket";
import { useSelector } from "react-redux";
import Picker from "emoji-picker-react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";


const MessageParent = styled.div`
    min-height: 8vh;
    grid-area: message-input;
    display: flex;
    justify-content: center;
    align-items: center;
`

const DeliveryContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

const Form = styled.form`
    display: flex;
    width: 100%;
    max-width: 500px;
`

const Input = styled.input`
    min-height: 25px;
    width: 100%;
    padding: 0 0.5rem 0 0.5rem;
    border: none;
    border-radius: 25px;
    background-color: rgb(50, 50, 50);
    color: white;
    &:focus {
        outline: none;
        border: 1px solid grey;
    }
`

interface Room {
    room: {
        currentRoom: string
    }
}

interface User {
    user: {
        username: string
    }
}

const errors = {
    maxLength: {
        value: 500,
        message: 'Message length is too long',
    },
}

const MessageInput = () => {
    const [ emoji, setEmoji ] = useState<{} | null >(null)
    const inputRef = useRef<HTMLInputElement>(null);
    const { register, handleSubmit, reset, setValue, getValues } = useForm();
    const currentRoom = useSelector((state: Room) => state.room.currentRoom);
    const user = useSelector((state: User) => state.user);

    const onSubmit = handleSubmit(({ message }) => {
        console.log(`message`)
        const timeOfMessage = moment().format("MMM Do, YYYY h:mm A");
        if (message.trim() !== '') {
            socket.emit('new-message', { message, currentRoom, user, timeOfMessage });
        }
        reset({message: ''});
    })

    const selectedEmoji = (event: any, emojiObject: { emoji: string }) => {
        // setEmoji(emojiObject.emoji);
        const inputValue = getValues('message');
        setValue('message', `${inputValue}${emojiObject.emoji}`)
    }

    return (
        <MessageParent>
            <DeliveryContainer>
            <Form onSubmit={onSubmit}>
                <Input {...register('message' , errors)} placeholder='' autoComplete='off' />
                <FontAwesomeIcon icon={ faFaceSmile }/>
            </Form>
            <Picker onEmojiClick={selectedEmoji} pickerStyle={{position: 'fixed', bottom: '70px', right: '450px'}}/>
            </DeliveryContainer>
        </MessageParent>
    )
}

export default MessageInput;