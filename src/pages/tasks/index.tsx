import { Header } from "@/components/Header";
import { TaskCard } from "@/components/RowCard";
import {
  Button,
  SimpleGrid,
  Link,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React from "react";
import data from "../test/testData.json";

const Tasks: React.FC = () => {
  const filteredData = data.filter(({ type }) => type === "TASK");
  console.log(filteredData);
  let index = 0;

  return (
    <div style={{ height: "100vh" }}>
      <Header title="Tasks" />
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          View Completed Tasks
        </FormLabel>
        <Switch id="completed-tasks" />
      </FormControl>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // margin: "20px",

          width: "100%",
          boxSizing: "border-box",
          maxWidth: "100rem",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1.875rem",
          paddingRight: "1.875rem",
        }}
      >
        <SimpleGrid spacing={4} w={"80%"} minWidth={"150px"}>
          {filteredData.map((task) => {
            index++;
            return <TaskCard task={task.text} checkbox={true} key={index} />;
          })}

          {/* <TaskCard
            task={`HHHHHHHHDASHDKJHASKJDHLKJAJSKDJKLSJDKLJSALKDJLKSJDKLJSLSADKJDLKAJWLKDJLKWAJDLKJAWLKDJLKWJA
              SLKDJKLAJDLKJWfsddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddLAKJDKLJLKSAJLKDJSKLWHDNJKAWNFKLDNFKSNAs`}
            checkbox={true}
          /> */}
        </SimpleGrid>
      </div>
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
