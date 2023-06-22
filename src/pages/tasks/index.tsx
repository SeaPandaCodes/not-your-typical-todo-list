import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";
import { Button, SimpleGrid, Link } from "@chakra-ui/react";
import React from "react";

const Tasks: React.FC = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Header title="Tasks" />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <SimpleGrid spacing={4}>
          <TaskCard task={"Water the plants"} />
          <TaskCard
            task={
              "HHHHHHHHDASHDKJHASKJDHLKJAJSKDJKLSJDKLJSALKDJLKSJDKLJSLSADKJDLKAJWLKDJLKWAJDLKJAWLKDJLKWJASLKDJKLAJDLKJWLAKJDKLJLKSAJLKDJSKLWHDNJKAWNFKLDNFKSNAs"
            }
          />
        </SimpleGrid>
      </div>
      <Link href="tasks/creation">
        <Button
          colorScheme="teal"
          size="lg"
          position="absolute"
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
