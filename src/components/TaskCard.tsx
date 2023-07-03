import { DeleteIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { trpc } from "@/utils/trpc";

export const TaskCard: React.FC<{
  task: string;
  type: "task" | "reward";
  cardId: string;
}> = ({ task, type, cardId }) => {
  const utils = trpc.useContext();

  const completeTask = trpc.completeTask.useMutation();

  const deleteReward = trpc.deleteReward.useMutation();
  const deleteTask = trpc.deleteTask.useMutation();

  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        variant="elevated"
        align="center"
        padding="0 30px 0  30px"
        borderRadius={"20px"}
        // bg="orange.200"
        // color={"gray.600"}
        // minW="80%"
        // w="full"
        // transition="all 250ms cubic-bezier(0.555, -0.435, 0.310, 1.470)"
        transition="all 250ms ease-in-out"
        _hover={{
          transform: "scale(1.02)",
          boxShadow: "0 1px 4px 4px var(--chakra-colors-purple-400)",
        }}
        boxShadow="0 1px 3px 2px var(--chakra-colors-purple-400)"
        // _active={{ transform: "scale(0.95)" }}
      >
        {type === "task" && (
          <Checkbox
            size="lg"
            colorScheme="purple"
            borderColor="purple.500"
            onChange={async () => {
              await completeTask.mutateAsync({ taskId: cardId });
              await utils.tasks.fetch();
              await utils.currentPoints.fetch();
              return;
            }}
          ></Checkbox>
        )}
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
            isLoading={deleteReward.isLoading || deleteTask.isLoading}
            onClick={async () => {
              if (type === "reward") {
                await deleteReward.mutateAsync({ rewardId: cardId });
                await utils.availableRewards.fetch();
                return;
              }
              await deleteTask.mutateAsync({ taskId: cardId });
              await utils.tasks.fetch();
            }}
          />
        </CardFooter>
      </Card>
    </>
  );
};
