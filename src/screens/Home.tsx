import { Avatar } from '@chakra-ui/avatar';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/layout';
import { Input, Tag } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

type TaskStatus = 'OPEN' | 'DONE' | 'IN_PROGRESS';

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

  const TasksList = () => (
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
        <TaskItem title="Task 1" status="OPEN" />
        <TaskItem title="Task 2" status="DONE" />
        <TaskItem title="Task 3" status="IN_PROGRESS" />
      </Box>
    </Flex>
  );

  return (
    <Flex minH="100vh" flexDir="column" pt={5}>
      <Head />
      <TasksList />
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
