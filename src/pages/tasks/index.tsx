import { TaskCard } from "@/components/TaskCard";
import {
  Button,
  SimpleGrid,
  Link,
  Switch,
  FormControl,
  FormLabel,
  Flex,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { trpc } from "@/utils/trpc";

const Tasks: React.FC = () => {
  const taskList = trpc.tasks.useQuery();

  return (
    <Box h="full">
      <Flex
        justifyContent="center"
        alignItems="center"
        w="full"
        maxW="6xl"
        mx="auto"
        px={{ base: "4", md: "24" }}
        transition="all 250ms ease-in-out"
      >
        <SimpleGrid spacing={4} w="full">
          {taskList.data !== undefined &&
            taskList.data.tasks.map((pointGroup) => {
              return (
                <React.Fragment key={pointGroup.points}>
                  {pointGroup.tasks.map((task) => {
                    return (
                      <TaskCard
                        task={task.name}
                        type={"task"}
                        cardId={task.id}
                        key={task.id}
                      />
                    );
                  })}
                </React.Fragment>
              );
            })}
        </SimpleGrid>
      </Flex>
      <Link href="tasks/creation">
        <Button
          colorScheme="teal"
          size="lg"
          position="fixed"
          bottom="20px"
          right="20px"
        >
          Add Task
        </Button>
      </Link>
    </Box>
  );
};

export default Tasks;
