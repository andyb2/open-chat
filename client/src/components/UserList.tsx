import { useSelector } from "react-redux";
import styled from "styled-components";

const UsersContainer = styled.div`
    grid-area: user-list
`

interface JoinedUser {
    room: {
        usersConnected: string[]
    }
}

const UserList = () => {
    const { usersConnected } = useSelector((state: JoinedUser) => state.room);
    console.log(`USERLIST`, usersConnected)
    return (
        <UsersContainer>
            {usersConnected.map((user) => {
                return (
                    <div>
                        {user}
                    </div>
                )
            })}
        </UsersContainer>
    )
}

export default UserList;