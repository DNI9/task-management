/* eslint-disable react/prop-types */
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Flex, HStack, Text } from '@chakra-ui/layout';
import { Tag } from '@chakra-ui/react';
import React from 'react';
import { TaskStatus } from '../types';

type Props = {
  title: string;
  status: TaskStatus;
};

const TaskItem: React.FC<Props> = ({ status, title }) => {
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

export default TaskItem;
