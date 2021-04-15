/* eslint-disable react/prop-types */
import { Flex, Text } from '@chakra-ui/layout';
import { Box, Skeleton, Stack } from '@chakra-ui/react';
import React from 'react';
import { TaskType } from '../types';
import TaskItem from './TaskItem';

type Props = {
  tasks: TaskType[];
  loading: boolean;
};

function genRandomId() {
  return Math.random().toString(36).substr(2, 9);
}

const TasksList: React.FC<Props> = ({ tasks, loading }) => {
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
        {!loading ? (
          tasks.map((task) => (
            <TaskItem key={task.id} title={task.title} status={task.status} />
          ))
        ) : (
          <Stack mx={3}>
            {Array.from({ length: 8 }).map(() => (
              <Skeleton
                startColor="#3d3b41"
                endColor="#252427"
                key={genRandomId()}
                h={14}
              />
            ))}
          </Stack>
        )}
      </Box>
    </Flex>
  );
};

export default TasksList;
