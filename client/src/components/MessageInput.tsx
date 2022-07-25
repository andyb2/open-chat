import { useState } from "react";
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
    height: 30px;
`

const Form = styled.form`
    display: flex;
    width: 100%;
    max-width: 500px;
    min-width: 200px;
`

const Input = styled.input`
    min-height: 25px;
    // height: 30px;
    width: 100%;
    padding: 0 0 0 1rem;
    border: none;
    border: 1px 0 1px 1px;
    border-radius: 25px 0 0 25px;
    background-color: rgb(50, 50, 50);
    color: white;
    &:focus {
        outline: none;
        // border: 1px solid grey;
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
    const [ renderPicker, setRenderPicker ] = useState<boolean>(false);
    const { register, handleSubmit, reset, setValue, getValues, setFocus } = useForm();
    const currentRoom = useSelector((state: Room) => state.room.currentRoom);
    const user = useSelector((state: User) => state.user);

    const onSubmit = handleSubmit(({ message }) => {
        const timeOfMessage = moment().format("MMM Do, YYYY h:mm A");
        if (message.trim() !== '') {
            socket.emit('new-message', { message, currentRoom, user, timeOfMessage });
        }
        reset({message: ''});
        setRenderPicker(false);
    })

    const selectedEmoji = (event: any, emojiObject: { emoji: string }) => {
        const inputValue = getValues('message');
        setValue('message', `${inputValue}${emojiObject.emoji}`);
        setRenderPicker(false);
        setFocus('message');
    }

    const activatePicker = () => {
        setRenderPicker(prev => !prev);
    }

    return (
        <MessageParent>
            <DeliveryContainer>
                <Form onSubmit={onSubmit}>
                    <Input {...register('message' , errors)} placeholder='' autoComplete='off' />
                    <Emoji onClick={() => activatePicker()}> <FontAwesomeIcon icon={ faFaceSmile }/> </Emoji>
                </Form>
                { renderPicker && <Picker onEmojiClick={selectedEmoji} native={true} preload={true} pickerStyle={{position: 'fixed', bottom: '70px', right: '450px'}}/> }
            </DeliveryContainer>
        </MessageParent>
    )
}

export default MessageInput;