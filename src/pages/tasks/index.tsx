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
import data from "../test/testData.json";

const Tasks: React.FC = () => {
  const filteredData = data.filter(({ type }) => type === "TASK");
  console.log(filteredData);

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
          {filteredData.map((task, index) => {
            return <TaskCard task={task.text} checkbox={true} key={index} />;
          })}

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
