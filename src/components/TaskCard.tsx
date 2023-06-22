import { DeleteIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React from "react";

export const TaskCard: React.FC<{ task: string }> = ({ task }) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      variant="elevated"
      align="center"
      padding="0 30px 0  30px"
      borderRadius={"20px"}
      bg="orange.200"
      color={"gray.600"}
      // maxW="80%"
      minW="80%"
    >
      <Checkbox size="lg" colorScheme="green"></Checkbox>
      {/* <CardHeader>
        <Heading size="md" flexWrap="wrap">
          {task}
        </Heading>
      </CardHeader> */}
      <CardBody>
        <Flex wrap={"wrap"}>
          <Text>{task}</Text>
        </Flex>
      </CardBody>
      <CardFooter>
        <IconButton
          // variant="outline"
          colorScheme="teal"
          aria-label="Send email"
          icon={<DeleteIcon />}
        />
      </CardFooter>
    </Card>
  );
};
