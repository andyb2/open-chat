import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { user } from '../app/reducer/userSlice';
import socket from '../socket';
import { randomUserColorChoice } from '../helperFunctions';

const Parent = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 5px;
    padding: 2rem;
    font-size: 15px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1rem;
`

const Title = styled.h1`
    margin: 0;
    line-height: 1;
`

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
`

const Paragraph = styled.p`
    margin: 0;
`
const Input = styled.input`
    border-radius: 15px;
    border: none;
    padding: 0.5rem;
    font-size: 15px;
    &:focus {
        outline: none;
    }
`

const Error = styled.p`
    color: red;
`

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
        value: 10,
        message: 'Username can only be maximum 10 characters',
    },
    required: {
        value: true,
        message: 'Input required'
    }
}

const UserCreate = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful, isSubmitting } } = useForm();
    const dispatch = useDispatch();
    const onSubmit = handleSubmit(({ username }) => {
            const randomColor = randomUserColorChoice();
            const userData = {
                username: username,
                color: randomColor
            }
            dispatch(user(userData));
            socket.emit('create-user', userData);
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
        if(!isSubmitting) {
            // react hook form setFocus() having issues... querySelector is temp
            document.querySelector('input')?.focus();
        }
    }, [isSubmitting])

    useEffect(() => {
        reset({username: ''});
    }, [isSubmitSuccessful]);

    return (
        <Parent>
            <Form onSubmit={onSubmit}>
                <Title>Create a username</Title>
                <Section>
                    <Paragraph>Username can only be maximum 10 characters</Paragraph>
                    <Paragraph>Only letters and numbers are accepted</Paragraph>
                </Section>
                <Input id='input' {...register('username', {  ...errorHandles, validate: (input) => isUnique(input) })} disabled={isSubmitting} placeholder='Enter Username' autoComplete='off' />
            </Form>
            { errors?.username && <Error>{`* ${errors.username.message}`}</Error> }
        </Parent>
    )

}
export default UserCreate;