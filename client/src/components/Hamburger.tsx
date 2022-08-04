import styled from "styled-components";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mobileViewSidebarToggle } from '../app/reducer/roomSlice';

interface Active {
    active: boolean
}

const Container = styled.div<Active>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: ${({ active }) => !active ? 'black' : 'rgb(50, 50, 50)'};
    @media (max-width: 400px) {
        padding: 0.5rem;
    }
`

interface Mobile {
    room: {
        mobile: boolean
    }
}

const Hamburger = () => {
    const [ activeHam, setActiveHam ] = useState(false);
    const mobile = useSelector((state: Mobile) => state.room.mobile)
    const dispatch = useDispatch();

    const toggleTheHamburgler = () => {
        setActiveHam(!mobile);
        dispatch(mobileViewSidebarToggle(!mobile))
    }

    return (
        <Container active={activeHam} onClick={() => toggleTheHamburgler()}>
            <FontAwesomeIcon icon={faBars} size={'2x'} />
        </Container>
    )
}

export default Hamburger;