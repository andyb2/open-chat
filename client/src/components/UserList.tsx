import { useSelector } from "react-redux";
import styled from "styled-components";

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
            }, idx: number) => JSX.Element): import("react").ReactNode;
        }
    }
    
}

const UserList = () => {
    const roomUsers = useSelector((state: JoinedUser) => state.room.roomUsers);

    return (
        <UsersContainer>
            <UsersTitle>users</UsersTitle>
            <List>
                {roomUsers.map(({ username, color }, idx) => {
                    return (
                        <User color={color} key={`${username} ${idx}`}>
                            {username}
                        </User>
                    )
                })}
            </List>
        </UsersContainer>
    )
}

export default UserList;