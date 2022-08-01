import styled from "styled-components";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface Active {
    active: boolean
}

const Container = styled.div<Active>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: ${({ active }) => !active ? 'black' : 'rgb(50, 50, 50)'};
`

const Hamburger = () => {
    const [ activeHam, setActiveHam ] = useState(false);

    const toggleTheHamburgler = () => {
        setActiveHam(prev => !prev);
    }

    return (
        <Container active={activeHam} onClick={() => toggleTheHamburgler()}>
            <FontAwesomeIcon icon={faBars} size={'2x'} />
        </Container>
    )
}

export default Hamburger;