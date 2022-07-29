import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { createPrivateRoom, privateRoomName } from "../app/reducer/roomSlice";

const UsersContainer = styled.div`
    grid-area: user-list;
    text-align: center;
    overflow: auto;
    display: flex;
    flex-direction: column;
    padding-right: 1rem;
`

const UsersTitle = styled.h1`
    color: white;
    margin: 0;
    line-height: 1;
    padding: 1rem;
`

const List = styled.div`
    overflow-y: scroll;
    background-color: black;
    &::-webkit-scrollbar {
        width: 7px;
      }
    &::-webkit-scrollbar-track {
        background: black;
      }
    &::-webkit-scrollbar-thumb {
        background: grey;
        border-radius: 5px;
      }
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
`

const User = styled.div`
    color: ${(props) => props.color};
    font-size: 13px;
    padding: 0.1rem;
    cursor: pointer;
    &:hover {
        font-size: 14px;
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

const UserList = () => {
    const roomUsers = useSelector((state: JoinedUser) => state.room.roomUsers);
    const user = useSelector((state: User) => state.user.username)
    const dispatch = useDispatch();

    const openPrivateChat = (socketId: string, username: string) => {
        if ( user !== username) {
            dispatch(createPrivateRoom({ username, socketId }));
            dispatch(privateRoomName({ username, socketId }));
        }
    }

    return (
        <UsersContainer>
            <UsersTitle>users</UsersTitle>
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