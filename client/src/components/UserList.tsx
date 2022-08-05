import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { createPrivateRoom, privateRoomName, activePrivateRoom } from "../app/reducer/roomSlice";

const UsersContainer = styled.div`
    grid-area: user-list;
    text-align: center;
    overflow: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
`

const UsersTitle = styled.h1`
    color: white;
    margin: 0;
    line-height: 1;
    padding: 1rem;
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    background-color: black;
    margin-top: 0.5rem;
    gap: 0.5rem;
    padding: 0;
    @media (min-width: 769px ) {
        &::-webkit-scrollbar {
            width: 5px;
            background: rgb(41,41,41);
          }
        &::-webkit-scrollbar-track {
            background: black;
            border-radius: 10px;
          }
        &::-webkit-scrollbar-thumb {
            background: grey;
            border-radius: 5px;
          }
        &::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
    }
`

const User = styled.button`
    color: ${(props) => props.color};
    background-color: black;
    border: 1px solid grey;
    border-radius: 05px;
    width: 80%;
    font-size: 13px;
    padding: 0.5rem;
    cursor: pointer;
    &:hover {
        font-size: 14px;
        background-color: rgb(40, 40, 40)
    }
    @media (max-width: 769px) {
        // width: 100%;
    }
`

interface JoinedUser {
    room: {
        roomUsers: {
            map(arg0: (data: {
                username: string,
                color: string,
                socket: string,
            }, idx: number) => JSX.Element): import("react").ReactNode;
        }
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

const UserList = () => {
    const roomUsers = useSelector((state: JoinedUser) => state.room.roomUsers);
    const user = useSelector((state: User) => state.user.username)
    const width = useSelector((state: Width) => state.width.dimension);
    const dispatch = useDispatch();
    

    const openPrivateChat = (socketId: string, username: string) => {
        if ( user !== username) {
            dispatch(createPrivateRoom({ username, socketId }));
            dispatch(privateRoomName({ username, socketId }));
            dispatch(activePrivateRoom(true));
        }
    }

    return (
        <UsersContainer>
            { width > 768 && <UsersTitle>users</UsersTitle> }
            <List>
                {roomUsers.map(({ username, color, socket }, idx) => {
                    
                    return (
                        <User onClick={() => openPrivateChat(socket, username)} color={color} key={`${username} ${idx}`}>
                            { username } 
                        </User>
                    )
                })}
            </List>
        </UsersContainer>
    )
}

export default UserList;