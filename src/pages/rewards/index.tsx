import React from "react";
import data from "../test/testData.json";
import { Header } from "@/components/Header";
import {
  Button,
  FormControl,
  FormLabel,
  Link,
  SimpleGrid,
  Switch,
} from "@chakra-ui/react";
import { TaskCard } from "@/components/TaskCard";

const Rewards: React.FC = () => {
  const filteredData = data.filter(({ type }) => type === "REWARD");
  let index = 0;

  return (
    <div style={{ height: "100vh" }}>
      <Header title="Rewards" />
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="email-alerts" mb="0">
          View Completed Rewards
        </FormLabel>
        <Switch id="completed-rewards" />
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
        <SimpleGrid spacing={4} w={"80%"}>
          {filteredData.map((task) => {
            index++;
            return <TaskCard task={task.text} checkbox={false} key={index} />;
          })}

          {/* <TaskCard
            task={`HHHHHHHHDASHDKJHASKJDHLKJAJSKDJKLSJDKLJSALKDJLKSJDKLJSLSADKJDLKAJWLKDJLKWAJDLKJAWLKDJLKWJA
              SLKDJKLAJDLKJWfsddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddLAKJDKLJLKSAJLKDJSKLWHDNJKAWNFKLDNFKSNAs`}
            checkbox={true}
          /> */}
        </SimpleGrid>
      </div>
      <Link href="rewards/creation">
        <Button
          colorScheme="teal"
          size="lg"
          position="fixed"
          bottom="20px"
          right="20px"
        >
          Add Reward
        </Button>
      </Link>
    </div>
  );
};

export default Rewards;
