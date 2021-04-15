import { Avatar } from '@chakra-ui/avatar';
import { AddIcon } from '@chakra-ui/icons';
import { Center, Flex, Heading, Stack } from '@chakra-ui/layout';
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TasksList from '../components/TaskList';
import { useTask } from '../context/tasks';

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {
    state: { tasks, loading },
  } = useTask();

  const Head = () => (
    <Flex mx={3} justify="space-between">
      <Stack spacing={0}>
        <Heading fontWeight="normal" as="h3" size="md">
          Hello, dni9
        </Heading>
        <Heading as="h1" size="lg">
          Good Morning
        </Heading>
      </Stack>
      <Link to="/login">
        <Avatar name="DNI9" src="" />
      </Link>
    </Flex>
  );

  if (loading)
    return (
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    );

  return (
    <Flex minH="100vh" flexDir="column" pt={5}>
      <Head />
      <TasksList tasks={tasks} />
      <Center m="auto 1rem 1rem auto">
        <IconButton
          onClick={onOpen}
          variant="solid"
          colorScheme="facebook"
          aria-label="Add new task"
          rounded="full"
          size="lg"
          icon={<AddIcon />}
        />
      </Center>
      <Modal size="sm" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#262528">
          <ModalHeader>Add a new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                placeholder="Add task name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Add task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Home;
