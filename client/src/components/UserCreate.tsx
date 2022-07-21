import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { user } from '../app/reducer/userSlice';
import socket from '../socket';

const Parent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 5px;
    padding: 2rem;
    font-size: 15px;
`

const Title = styled.h1`
    margin: 0;
`

const Section = styled.section`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`

const Paragraph = styled.p`
    margin: 0;
`

const Error = styled.p`
    position: absolute;
    // top: 0;
    color: red;
`

interface FormValues {
    username: string
}

const errorHandles = {
    pattern: {
        value: /^[A-Za-z0-9]+$/i, 
        message: 'Username must only contain letters/numbers',
    },
    minLength: {
        value: 5,
        message: 'Username must be a minimum of 5 characters',
    },
    maxLength: {
        value: 15,
        message: 'Username can only be maximum 15 characters',
    },
}

const UserCreate = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<FormValues>();
    const dispatch = useDispatch();
    
    const onSubmit = handleSubmit( async ({ username }) => {
            dispatch(user(username));
            socket.emit('create-user', username)
    });

    const isUnique = async (username: string) => {
            const data = {
                user: username
            };
            const checkForUniqueUsername = await fetch('/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const response = await checkForUniqueUsername.json();

            if (!response) return 'Username already exists';
            return response;
    }

    useEffect(() => {
        reset({username: ''})
    }, [isSubmitSuccessful]);

    return (
        <Parent>
            <form onSubmit={onSubmit}>
                <Title>Create a username</Title>
                <Section>
                    <Paragraph>* Username can only be maximum 15 characters</Paragraph>
                    <Paragraph>* Only letters and numbers are accepted</Paragraph>
                </Section>
                <input {...register('username', {  ...errorHandles, validate: (input) => isUnique(input)}, )} placeholder='Enter Username' autoComplete='off' />
                { errors?.username && <Error>{`* ${errors.username.message}`}</Error> }
            </form>
        </Parent>
    )
}

export default UserCreate;