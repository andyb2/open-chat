import { useSelector } from "react-redux";
import styled from "styled-components";

const UsersContainer = styled.div`
    grid-area: user-list;
    border-left: 1px solid rgb(234, 234, 234);
    padding: 0.2rem;
    text-align: center;
`

const UsersTitle = styled.h1`
    color: white;
    margin: 0;
    line-height: 1;
    font-size: 20px;
    padding: 1rem;
`

const User = styled.div`
    color: ${(props) => props.color};
    font-size: 13px;
    padding: 0.1rem;
    cursor: pointer;
    // border-bottom: 1px solid grey;
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
    console.log(`[USERLIST]: componenet rendered`);
    return (
        <UsersContainer>
            <UsersTitle>Users</UsersTitle>
            {roomUsers.map(({ username, color }, idx) => {
                {console.log(`USERLIST`, username)}
                return (
                    <User color={color} key={`${username} ${idx}`}>
                        {username}
                    </User>
                )
            })}
        </UsersContainer>
    )
}

export default UserList;