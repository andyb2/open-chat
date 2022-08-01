import { useSelector } from 'react-redux';
import './App.css';
import UserCreate from './components/UserCreate';
import Chat from './page/Chat';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export interface Username {
  user: {
    username: string
  }
}

const App = () => {
  const { username } = useSelector((state: Username) => state.user) || {};

  return (
    <Container>
      { !username ? <UserCreate /> : <Chat /> }
    </Container>
  );
}

export default App;
