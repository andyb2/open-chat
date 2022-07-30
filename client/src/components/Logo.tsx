import styled from "styled-components";

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`

const OpenChat = styled.p`
    font-size: 25px;
`

const Logo = () => {
    return (
        <LogoContainer>
            <OpenChat>
                open-chat
            </OpenChat>
        </LogoContainer>
    )
}

export default Logo;