import { Avatar } from '@chakra-ui/avatar';
import { AddIcon, SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';
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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import { HiOutlineLogout } from 'react-icons/hi';
import { RiSettings4Line } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import TasksList from '../components/TaskList';
import { useAuth } from '../context/auth';
import { useTask } from '../context/tasks';
import { greetUser } from '../utils';

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { push } = useHistory();

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

  const {
    state: { me },
  } = useAuth();

  useEffect(() => {
    if (!me) push('/login');
    getTasks();
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken');
    window.location.reload();
  };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    searchTasks({ search, status: filter });
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
          Hello, {me?.username ?? 'User'}
        </Heading>
        <Heading as="h1" size="lg">
          {greetUser()}
        </Heading>
      </Stack>
      <IconButton
        onClick={() => {
          setOpenSearchBar(!openSearchBar);
          dispatch({ type: 'REMOVE_SEARCH_RESULTS' });
          setSearch('');
          setFilter('');
        }}
        ml="auto"
        mr={3}
        rounded="full"
        aria-label="Search tasks"
        icon={!openSearchBar ? <SearchIcon /> : <SmallCloseIcon />}
      />
      <Menu isLazy offset={[0, -50]}>
        <MenuButton cursor="pointer" as={Avatar} aria-label="Menu">
          <Avatar name={me?.username ?? 'User'} src="" />
        </MenuButton>
        <MenuList bg="#262528">
          <MenuItem icon={<RiSettings4Line size={20} />}>Settings</MenuItem>
          <MenuItem onClick={logout} icon={<HiOutlineLogout size={20} />}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );

  return (
    <Flex minH="100vh" flexDir="column" pt={5}>
      <Head />
      <Collapse unmountOnExit in={openSearchBar} animateOpacity>
        <Box mx={3} mt="4" rounded="md" shadow="md">
          <form onSubmit={onSearch}>
            <InputGroup size="md">
              <Input
                autoFocus
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

      <TasksList
        loading={loading}
        tasks={searchResults ?? tasks.filter((task) => task.status !== 'DONE')}
      />

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
