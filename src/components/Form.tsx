/* eslint-disable react/prop-types */
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../context/auth';

type Props = {
  event: 'LOGIN' | 'REGISTER';
};

const Form: React.FC<Props> = ({ event }) => {
  const {
    dispatch,
    state: { loading },
  } = useAuth();
  const toast = useToast();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleClick = () => setShow(!show);

  const {
    state: { me },
  } = useAuth();

  if (me) history.push('/');

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (event === 'LOGIN') {
        dispatch({ type: 'SET_LOADING' });
        const res = await axios.post('/auth/signin', { username, password });
        localStorage.setItem('accessToken', res.data.accessToken);
        dispatch({ type: 'LOGIN' });
        toast({
          status: 'success',
          title: 'Login successful',
        });
        window.location.reload();
      } else {
        dispatch({ type: 'SET_LOADING' });
        const res = await axios.post('/auth/signup', { username, password });
        if (res.status === 201) {
          dispatch({ type: 'REGISTER' });
          toast({
            status: 'success',
            title: 'Sign up successful, please login',
          });
          history.push('/login');
        }
      }
    } catch (err) {
      dispatch({ type: 'SET_LOADING' });
      if (typeof err.response.data.message === 'string') {
        toast({
          title: err.response.data.message,
          status: 'error',
          isClosable: true,
        });
      } else {
        err.response.data.message.forEach((message: string) =>
          toast({
            title: message,
            status: 'error',
            isClosable: true,
          })
        );
      }
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <FormControl id="username" isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <Spacer h="3" />
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pr="5rem"
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
          />
          <InputRightElement>
            <IconButton
              rounded="5px"
              size="sm"
              onClick={handleClick}
              aria-label="Show/hide password"
              icon={show ? <ViewOffIcon /> : <ViewIcon />}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Spacer h="3" />
      <Button
        type="submit"
        isLoading={loading}
        loadingText="Submitting"
        variant="outline"
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
