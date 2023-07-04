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
import { PageLayout } from "@/components/PageLayout";
import { TitledContainer } from "@/components/TitledContainer";

const Tasks: React.FC = () => {
  const taskList = trpc.tasks.useQuery();

  return (
    <PageLayout buttonSpace={120}>
      <Flex
        justifyContent="center"
        alignItems="center"
        w="full"
        maxW="4xl"
        mx="auto"
        px={{ base: "4", md: "24" }}
        transition="all 250ms ease-in-out"
      >
        <Flex flexDir="column" rowGap="10" w="full">
          {taskList.data !== undefined &&
            taskList.data.tasks.map((pointGroup) => {
              return (
                <TitledContainer
                  key={pointGroup.points}
                  title={`${pointGroup.points} Point Tasks`}
                >
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
                </TitledContainer>
              );
            })}
        </Flex>
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
    </PageLayout>
  );
};

export default Tasks;
