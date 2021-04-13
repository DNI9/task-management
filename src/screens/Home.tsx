import { Avatar } from '@chakra-ui/avatar';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/layout';
import { Input, Tag } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { TaskType } from '../types';

const Home = () => {
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

  const TaskItem = ({
    title,
    status,
  }: {
    title: string;
    status: TaskStatus;
  }) => {
    return (
      <Flex
        bgGradient="linear-gradient(to-r, #262529, #353339)"
        justify="space-between"
        align="center"
        h="14"
        _notLast={{ mb: 2 }}
        px={3}
        mx={3}
        cursor="pointer"
      >
        <HStack maxW="67%">
          <CheckCircleIcon />
          <Text isTruncated>{title}</Text>
        </HStack>
        <Tag
          size="sm"
          variant="subtle"
          colorScheme={
            // eslint-disable-next-line no-nested-ternary
            status === 'OPEN' ? 'blue' : status === 'DONE' ? 'green' : 'yellow'
          }
          fontWeight="medium"
          letterSpacing={1}
          rounded="none"
        >
          {status}
        </Tag>
      </Flex>
    );
  };

  const TasksList = ({ tasks }: { tasks: TaskType[] | undefined }) => (
    <Flex mt={10} flexDir="column">
      <Text
        px={3}
        opacity={0.8}
        fontSize="md"
        fontWeight="semibold"
        letterSpacing={1}
        mb={3}
      >
        My tasks
      </Text>

      <Box>
        {tasks?.map((task) => (
          <TaskItem key={task.id} title={task.title} status={task.status} />
        ))}
      </Box>
    </Flex>
  );

  const { status, data, error } = useQuery<TaskType[]>('/tasks');

  if (status === 'error')
    return (
      <div className="">
        <p>Error : {error.message}</p>
        <Link to="/login">Login</Link>
      </div>
    );
  if (status === 'loading') return <h1>Loading...</h1>;

  return (
    <Flex minH="100vh" flexDir="column" pt={5}>
      <Head />
      <TasksList tasks={data} />
      <Input
        rounded="none"
        mt="auto"
        variant="filled"
        h="14"
        placeholder="Add a new task &amp; press enter"
        border="1px"
        borderColor="whiteAlpha.300"
      />
    </Flex>
  );
};

export default Home;
