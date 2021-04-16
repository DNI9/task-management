/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { Badge, Divider, Heading, HStack, Text } from '@chakra-ui/layout';
import {
  chakra,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HTMLChakraProps,
  Icon,
  Radio,
  RadioGroup,
  useDisclosure,
} from '@chakra-ui/react';
import { HTMLMotionProps, motion, PanInfo } from 'framer-motion';
import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import { IoCheckmarkCircleSharp, IoSyncCircleSharp } from 'react-icons/io5';
import { RiRecordCircleFill } from 'react-icons/ri';
import { useTask } from '../context/tasks';
import { TaskStatus } from '../types';

type Props = {
  title: string;
  status: TaskStatus;
  description: string;
  id: number;
};

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionBoxProps = Merge<HTMLChakraProps<'div'>, HTMLMotionProps<'div'>>;
export const MotionFlex: React.FC<MotionBoxProps> = motion(chakra.div);

const TaskItem: React.FC<Props> = ({ id, status, title, description }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, setFilter] = useState<TaskStatus>(status);
  const { updateTaskStatus } = useTask();

  const debouncedUpdateTaskStatus = useCallback(
    debounce((f) => updateTaskStatus(id, f), 500),
    []
  );

  const dragAction = (_: any, { offset }: PanInfo) => {
    if (Math.abs(offset.x) > 200) {
      if (offset.x < 0) {
        if (status !== 'IN_PROGRESS') updateTaskStatus(id, 'IN_PROGRESS');
      } else if (status !== 'DONE') updateTaskStatus(id, 'DONE');
    }
  };

  const StatusTag = () => (
    <Badge
      size="sm"
      variant="subtle"
      colorScheme={
        status === 'OPEN' ? 'blue' : status === 'DONE' ? 'green' : 'yellow'
      }
      fontWeight="bold"
      letterSpacing={1}
      rounded="none"
    >
      {status}
    </Badge>
  );

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
      onDoubleClick={onOpen}
    >
      <HStack maxW="67%">
        {status === 'OPEN' ? (
          <Icon w={8} h={6} color="blue.300" as={RiRecordCircleFill} />
        ) : status === 'DONE' ? (
          <Icon w={8} h={6} color="green.300" as={IoCheckmarkCircleSharp} />
        ) : (
          <Icon w={8} h={6} color="yellow.300" as={IoSyncCircleSharp} />
        )}
        <Text isTruncated>{title}</Text>
      </HStack>
      <StatusTag />

      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent bgGradient="linear(to-bl, #262528, #201F21)">
            <DrawerHeader>
              <HStack justify="space-between">
                <Heading as="h1" size="lg">
                  {title}
                </Heading>
                <StatusTag />
              </HStack>
              <Divider mt={2} />
            </DrawerHeader>
            <DrawerBody>
              <Badge letterSpacing={1}>Description</Badge>
              <Text opacity={0.9}>{description}</Text>
              <Badge letterSpacing={1} my={2}>
                Update Status
              </Badge>
              <RadioGroup
                onChange={(value: TaskStatus) => {
                  setFilter(value);
                  debouncedUpdateTaskStatus(value);
                }}
                defaultValue={status}
              >
                <HStack spacing={4}>
                  <Radio value="OPEN">Open</Radio>
                  <Radio value="DONE">Done</Radio>
                  <Radio value="IN_PROGRESS">In Progress</Radio>
                </HStack>
              </RadioGroup>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </MotionFlex>
  );
};

export default TaskItem;
