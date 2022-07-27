import styled from "styled-components";

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    width: 100%;
    // border: 1px solid white;
`

const OpenChat = styled.p`
    // padding: 1rem;
    white-space: pre-line;
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