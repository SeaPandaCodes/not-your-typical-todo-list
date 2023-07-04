import { DeleteIcon } from "@chakra-ui/icons";
import { Checkbox, Flex, Grid, IconButton, Text, Box } from "@chakra-ui/react";
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
    <Grid
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      columnGap="4"
      borderRadius={{
        base: "none",
        md: "2xl",
      }}
      w="full"
      templateColumns={
        type === "task" ? "min-content 1fr min-content" : "1fr min-content"
      }
      alignItems="center"
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
      <Text textOverflow="ellipsis" display="block" minWidth={0}>
        {task}
      </Text>
      <IconButton
        // variant="outline"
        colorScheme="teal"
        aria-label="Send email"
        variant="ghost"
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
    </Grid>
  );
};
