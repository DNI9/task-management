import { Flex, Text } from '@chakra-ui/layout';
import { Heading, Link } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Form from '../components/Form';

const Register = () => {
  return (
    <Flex minH="100vh" flexDir="column" mx={10} justify="center">
      <Heading size="2xl" mb={5}>
        Register
      </Heading>

      <Form event="REGISTER" />

      <Text mt={3} alignSelf="start">
        Existing user?{' '}
        <Link fontWeight="bold" color="blue.200" as={RouterLink} to="/login">
          Login
        </Link>
      </Text>
    </Flex>
  );
};

export default Register;
