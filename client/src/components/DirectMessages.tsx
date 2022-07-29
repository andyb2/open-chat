import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { privateRoomName } from "../app/reducer/roomSlice";

const Box = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 13px;
`

const Dm = styled.div`
    display: flex;
    border: 1px solid white;
    justify-content: center;
    padding: 1rem;
    border-radius: 10px;
`

interface PrivateMessage {
    room: {
        privateMessages: {
          [user: string]: {
            username: string
            socketId: string
          }
        }
      
    }
}

const DirectMessages = () => {
    const privateMessages = useSelector((state: PrivateMessage) => state.room.privateMessages)
    const dispatch = useDispatch();

    const renderExisitingPrivateChat = (username: string, socketId: string) => {
        console.log(socketId)
        dispatch(privateRoomName({ username, socketId }))
    }

    return (
        <Box>
            {
                Object.keys(privateMessages).map((user, idx) => {
                    return (
                        <Dm key={`${privateMessages[user].username}-${idx}`}  onClick={() => renderExisitingPrivateChat(privateMessages[user].username, privateMessages[user].socketId)}>
                            { privateMessages[user].username }
                        </Dm>
                    )
                })

            }
        </Box>
    )
}

export default DirectMessages;