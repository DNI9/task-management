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
} from '@chakra-ui/react';
import React, { FormEvent, useState } from 'react';

type Props = {
  event: 'LOGIN' | 'REGISTER';
};

const Form: React.FC<Props> = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleClick = () => setShow(!show);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
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
        // isLoading
        loadingText="Submitting"
        variant="outline"
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
