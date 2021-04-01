import { Flex, Text } from '@chakra-ui/layout';
import { Heading, Link } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Form from '../components/Form';

const Login = () => {
  return (
    <Flex minH="100vh" flexDir="column" mx={10} justify="center">
      <Heading size="2xl" mb={5}>
        Login
      </Heading>

      <Form event="LOGIN" />

      <Text mt={3} alignSelf="start">
        New here?{' '}
        <Link fontWeight="bold" color="blue.200" as={RouterLink} to="/register">
          Sign up
        </Link>
      </Text>
    </Flex>
  );
};

export default Login;
