import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";
import {
  Button,
  SimpleGrid,
  Link,
  Switch,
  FormControl,
  FormLabel,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { trpc } from "@/utils/trpc";

const Tasks: React.FC = () => {
  const taskList = trpc.tasks.useQuery();

  return (
    <div style={{ height: "100vh" }}>
      <Header title="Tasks" />
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          View Completed Tasks
        </FormLabel>
        <Switch id="completed-tasks" />
      </FormControl>

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
                <>
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
                </>
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
    </div>
  );
};

export default Tasks;
