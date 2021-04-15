/* eslint-disable react/prop-types */
import { Flex, Text } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';
import React from 'react';
import { TaskType } from '../types';
import TaskItem from './TaskItem';

type Props = {
  tasks: TaskType[];
};

const TasksList: React.FC<Props> = ({ tasks }) => {
  return (
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
        {tasks.map((task) => (
          <TaskItem key={task.id} title={task.title} status={task.status} />
        ))}
      </Box>
    </Flex>
  );
};

export default TasksList;
