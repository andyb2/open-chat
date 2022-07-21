import styled from "styled-components";
import { useForm } from "react-hook-form";
import socket from "../socket";
import { useDispatch, useSelector } from "react-redux";


const MessageParent = styled.div`
    min-height: 8vh;
    grid-area: message-input;
    // border: 1px solid blue;
    display: flex;
    justify-content: center;
    align-items: center;
`

const DeliveryContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    // border: 1px solid green;
`

const Input = styled.input`
    min-height: 30px;
    width: 85%;
    padding-left: 1rem;
    border: 1px solid;
    border-color: black rgb(0, 166, 255) black black;
    border-radius: 25px 0 0 25px;
`

const Button = styled.button`
    padding: 0;
    padding: 0 1rem 0 1rem;
    border: 1px solid rgb(0, 166, 255);
    border-radius: 0 25px 25px 0;
    background-color: rgb(0, 166, 255);
    color: white;
    // width: 100%;
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

const MessageInput = () => {
    const { register, handleSubmit, reset } = useForm();
    const currentRoom = useSelector((state: Room) => state.room.currentRoom);
    const username = useSelector((state: User) => state.user.username);

    const onSubmit = handleSubmit(({ message }) => {
        socket.emit('new-message', { message, currentRoom, username });
        reset({message: ''});
    })

    return (
        <MessageParent>
            <DeliveryContainer>
            <form style={{display: 'flex'}}>
                <Input {...register('message' )} placeholder='Enter Username' autoComplete='off' />
                <Button onClick={onSubmit}>Send</Button>
            </form>
            </DeliveryContainer>
        </MessageParent>
    )
}

export default MessageInput;