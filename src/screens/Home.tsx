import { Avatar } from '@chakra-ui/avatar';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { Flex, Heading, Stack } from '@chakra-ui/layout';
import {
  Box,
  Button,
  Collapse,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TasksList from '../components/TaskList';
import { useTask } from '../context/tasks';

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const {
    state: { tasks, loading, searchResults },
    getTasks,
    searchTasks,
    dispatch,
    createTask,
  } = useTask();

  useEffect(() => {
    getTasks();
  }, []);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!search) dispatch({ type: 'REMOVE_SEARCH_RESULTS' });
    if (search) searchTasks({ search, status: filter });
  };

  const onCreateTask = () => {
    createTask({ title, description });
    setDescription('');
    setTitle('');
    onClose();
  };

  const Head = () => (
    <Flex mx={3} justify="space-between" alignItems="center">
      <Stack spacing={0}>
        <Heading fontWeight="normal" as="h3" size="md">
          Hello, dni9
        </Heading>
        <Heading as="h1" size="lg">
          Good Morning
        </Heading>
      </Stack>
      <IconButton
        onClick={() => {
          setOpenSearchBar(!openSearchBar);
          dispatch({ type: 'REMOVE_SEARCH_RESULTS' });
        }}
        ml="auto"
        mr={3}
        rounded="full"
        aria-label="Search tasks"
        icon={<SearchIcon />}
      />
      <Link to="/login">
        <Avatar name="DNI9" src="" />
      </Link>
    </Flex>
  );

  return (
    <Flex minH="100vh" flexDir="column" pt={5}>
      <Head />
      <Collapse in={openSearchBar} animateOpacity>
        <Box mx={3} mt="4" rounded="md" shadow="md">
          <form onSubmit={onSearch}>
            <InputGroup size="md">
              <Input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                pr="4.5rem"
                type="text"
                placeholder="Search tasks and press enter"
              />
              <InputRightElement width="6.5rem">
                <Select
                  onChange={(e) => setFilter(e.target.value)}
                  variant="filled"
                  roundedTopLeft="none"
                  roundedBottomLeft="none"
                  placeholder="Filters"
                >
                  <option value="OPEN">Open</option>
                  <option value="DONE">Done</option>
                  <option value="IN_PROGRESS">Progress</option>
                </Select>
              </InputRightElement>
            </InputGroup>
          </form>
        </Box>
      </Collapse>

      <TasksList loading={loading} tasks={searchResults ?? tasks} />

      <Box pos="fixed" bottom={3} right={3}>
        <IconButton
          onClick={onOpen}
          variant="solid"
          colorScheme="facebook"
          aria-label="Add new task"
          rounded="full"
          size="lg"
          icon={<AddIcon />}
        />
      </Box>
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
            <Button colorScheme="blue" onClick={onCreateTask} mr={3}>
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
