import { useSelector } from "react-redux";
import styled from "styled-components";

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    
`

const OpenChat = styled.p`
    font-size: 20px;
    margin: 0;
    padding: 0.5rem;   
`

const Userss = styled.div`
    // position: absolute;
    color: ${({ color }) => color};
`

interface User {
    user: {
        username: string
        color: string
    }
}

const Logo = () => {
    const username = useSelector((state: User) => state.user.username);
    const color = useSelector((state: User) => state.user.color);

    return (
        <LogoContainer>
            <OpenChat>
                open-chat
            </OpenChat>
            <Userss color={color}>
                { username }
            </Userss>
        </LogoContainer>
    )
}

export default Logo;