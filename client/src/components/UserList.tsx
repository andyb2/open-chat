import { useSelector } from "react-redux";
import styled from "styled-components";

const UsersContainer = styled.div`
    grid-area: user-list
`

interface JoinedUser {
    room: {
        roomUsers: string[]
    }
}

const UserList = () => {
    const roomUsers = useSelector((state: JoinedUser) => state.room.roomUsers);
    
    return (
        <UsersContainer>
            {roomUsers.map((user) => {
                return (
                    <div key={user}>
                        {user}
                    </div>
                )
            })}
        </UsersContainer>
    )
}

export default UserList;