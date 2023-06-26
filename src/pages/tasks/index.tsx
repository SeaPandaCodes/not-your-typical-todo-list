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
  Box,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import data from "../test/testData.json";
import { trpc } from "@/utils/trpc";

const Tasks: React.FC = () => {
  const filteredData = data.filter(({ type }) => type === "TASK");
  // console.log(filteredData);

  const taskList = trpc.tasks.useQuery();

  function refetch() {
    taskList.refetch();
    console.log("fetch");
  }

  console.log(
    "data",
    "isFethc",
    taskList.isFetching,
    "isRefetch",
    taskList.isRefetching,
    "isErr",
    taskList.isRefetchError
  );

  useEffect(() => {
    console.log("USEEFFECT");
  }, [taskList.isRefetching]);
  // console.log("newTask", taskList.isRefetching);

  // const rewardList = trpc.availableRewards.useQuery();
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
        <Button onClick={refetch} />
        <SimpleGrid spacing={4} w="full">
          {taskList.isSuccess &&
            taskList.isFetched &&
            taskList.data.tasks.map((pointGroup) => {
              console.log("UPDATEEEEEEEEEEEEEEEEEE");
              return (
                <>
                  {pointGroup.tasks.map((task) => {
                    return (
                      <TaskCard
                        task={task.name}
                        checkbox={true}
                        cardId={task.id}
                        key={task.id}
                        refetch={refetch}
                      />
                    );
                  })}
                </>
              );
            })}

          {/* {filteredData.map((task, index) => {
            console.log(taskList.data);
            return (
              <TaskCard
                task={task.text}
                checkbox={true}
                key={index}
                cardId="test"
              />
            );
          })} */}

          {/* <TaskCard
            task={`HHHHHHHHDA SHDKJHASKJDHLKJAJSKDJKLSJDKLJSALKDJLK SJDKLJSLSADKJDLKAJWLKDJLKWAJDLKJAWLKDJLKWJA
              SLKD JKLAJDLKJWfsddddddddddddddd dddddddddddddddddddddddd dddddddddddddddddddddddLAK JDKLJLKSAJLKDJSKLWHDNJKAWNFKLDNFKSNAs`}
            checkbox={true}
          /> */}
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
