/* eslint-disable react/prop-types */
import { CheckCircleIcon } from '@chakra-ui/icons';
import { HStack, Text } from '@chakra-ui/layout';
import { chakra, HTMLChakraProps, Tag } from '@chakra-ui/react';
import { HTMLMotionProps, motion, PanInfo } from 'framer-motion';
import React from 'react';
import { useTask } from '../context/tasks';
import { TaskStatus } from '../types';

type Props = {
  title: string;
  status: TaskStatus;
  id: number;
};

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionBoxProps = Merge<HTMLChakraProps<'div'>, HTMLMotionProps<'div'>>;
export const MotionFlex: React.FC<MotionBoxProps> = motion(chakra.div);

const TaskItem: React.FC<Props> = ({ id, status, title }) => {
  const { updateTaskStatus } = useTask();

  const dragAction = (_: any, { offset }: PanInfo) => {
    if (offset.x < 0) {
      if (status !== 'IN_PROGRESS') updateTaskStatus(id, 'IN_PROGRESS');
    } else if (status !== 'DONE') updateTaskStatus(id, 'DONE');
  };

  return (
    <MotionFlex
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={dragAction}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 15 }}
      bgGradient="linear-gradient(to-r, #262529, #353339)"
      justifyContent="space-between"
      alignItems="center"
      display="flex"
      h={14}
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
    </MotionFlex>
  );
};

export default TaskItem;
