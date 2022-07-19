import styled from "styled-components";

const MessageParent = styled.div`
    // height: 100%;
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

const MessageInput = () => {
    return (
        <MessageParent>
            <DeliveryContainer>
                <Input />
                <Button>Send</Button>
            </DeliveryContainer>
        </MessageParent>
    )
}

export default MessageInput;