import { GoalProgressBar } from "@/components/GoalProgressBar";
import { PageLayout } from "@/components/PageLayout";
import { RewardModal } from "@/components/RewardModal";
import { TaskCard } from "@/components/TaskCard";
import { TitledContainer } from "@/components/TitledContainer";
import { taskCreationSchema } from "@/pages/tasks/creation";
import { trpc } from "@/utils/trpc";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Link,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import IMG_FOX from "../img/FOX.png";
import { rewardCreationSchema } from "./rewards/creation";

const NewTask: React.FC<{ points: number; type: "task" | "reward" }> = ({
  points,
  type,
}) => {
  const addTask = trpc.addTask.useMutation();
  const addReward = trpc.addReward.useMutation();
  const utils = trpc.useContext();

  const [itemName, setItemName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: { preventDefault?: () => void }) => {
    e?.preventDefault?.();

    if (type === "task") {
      const parseResult = taskCreationSchema.safeParse({
        name: itemName,
        points: points.toString(),
      });

      if (!parseResult.success) return;

      setLoading(true);
      await addTask.mutateAsync(parseResult.data);
      await utils.tasks.refetch();
    } else {
      const parseResult = rewardCreationSchema.safeParse({
        name: itemName,
        points: points.toString(),
        maxRedemptions: null,
      });

      if (!parseResult.success) return;

      setLoading(true);
      await addReward.mutateAsync(parseResult.data);
      await utils.availableRewards.refetch();
    }

    setLoading(false);
    setItemName("");
  };

  return (
    <Grid
      as="form"
      onSubmit={handleSubmit}
      templateColumns="1fr min-content"
      w="full"
      columnGap="2"
    >
      <Input
        placeholder="Write new task..."
        w="full"
        variant="flushed"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <Button
        variant="ghost"
        isLoading={loading}
        onClick={() => handleSubmit()}
        w="40px"
        isDisabled={itemName.trim().length === 0}
      >
        <PlusSquareIcon />
      </Button>
    </Grid>
  );
};

export default function Home() {
  const utils = trpc.useContext();
  const taskList = trpc.tasks.useQuery();
  const rewardList = trpc.availableRewards.useQuery();
  const currentPoints = trpc.currentPoints.useQuery();

  const [selectedRewardTier, setSelectedRewardTier] = useState<number | null>(
    null
  );
  const [selectedList, setSelectedList] = useState<"task" | "reward">("task");

  const pointBalance = currentPoints.data?.point_balance;

  const pointTiers = [10, 30, 60];

  return (
    <PageLayout buttonSpace={120}>
      <Stack flex={"column"} justify={"center"} align={"center"}>
        <Flex flex="row" justify={"center"} align={"center"}>
          <Image priority src={IMG_FOX} alt="Fox" />
        </Flex>
        <Heading textAlign="center" fontSize="2xl" mt="6">
          Claim Reward
        </Heading>
        <Flex
          justifyContent="center"
          alignItems="center"
          direction="column"
          w="full"
          maxW="4xl"
          mx="auto"
          px={{ base: "4", md: "24" }}
          transition="all 250ms ease-in-out"
        >
          {pointBalance !== undefined && (
            <Flex direction="column" w="full">
              <GoalProgressBar />

              <Grid
                templateColumns="repeat(6, 1fr)"
                templateRows="repeat(1, 1fr)"
                w="full"
                mt="2"
              >
                <GridItem
                  rowStart={3}
                  colSpan={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid
                    w="full"
                    templateColumns="1fr 60px 1fr"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box></Box>
                    <Button
                      wordBreak="break-word"
                      onClick={() => {
                        setSelectedRewardTier(10);
                      }}
                      onMouseEnter={() => {
                        utils.availableRewards.prefetch();
                      }}
                      border={pointBalance < 10 ? "none" : "2px"}
                      borderColor="purple.200"
                      isDisabled={pointBalance < 10}
                    >
                      -10
                    </Button>
                  </Grid>
                </GridItem>
                <GridItem
                  rowStart={3}
                  colSpan={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    w="60px"
                    wordBreak="break-word"
                    onClick={() => {
                      setSelectedRewardTier(30);
                    }}
                    onMouseEnter={() => {
                      utils.availableRewards.prefetch();
                    }}
                    isDisabled={pointBalance < 30}
                    border={pointBalance < 30 ? "none" : "2px"}
                    borderColor="purple.400"
                  >
                    -30
                  </Button>
                </GridItem>
                <GridItem
                  rowStart={3}
                  colSpan={2}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button
                    w="60px"
                    wordBreak="break-word"
                    onClick={() => {
                      setSelectedRewardTier(60);
                    }}
                    onMouseEnter={() => {
                      utils.availableRewards.prefetch();
                    }}
                    isDisabled={pointBalance < 60}
                    border={pointBalance < 60 ? "none" : "2px"}
                    borderColor="purple.800"
                  >
                    -60
                  </Button>
                </GridItem>
              </Grid>
            </Flex>
          )}
          <Divider my="8" />
          <Box borderWidth="2px" mb="6" position="relative">
            <Box
              position="absolute"
              w="50%"
              h="full"
              bg="purple"
              transform={selectedList !== "task" ? "translateX(100%)" : "auto"}
              transition="all 320ms ease-in-out"
              zIndex="-1"
            />
            <Flex flexDir="row">
              <Heading
                textAlign="center"
                fontSize="2xl"
                w="128px"
                // bg="blue"
                p="4"
                // mb="6"
                borderColor="purple.500"
                // borderBottom
                onClick={() => setSelectedList("task")}
              >
                Tasks
              </Heading>
              <Heading
                textAlign="center"
                fontSize="2xl"
                w="128px"
                // bg="purple"
                p="4"
                // mb="6"
                onClick={() => setSelectedList("reward")}
              >
                Rewards
              </Heading>
            </Flex>
          </Box>
          <Box position="relative" w="full">
            <Flex
              position="absolute"
              flexDir="column"
              rowGap="10"
              w="full"
              maxW="6xl"
              transform={selectedList !== "task" ? "translateX(-200%)" : "auto"}
              transition="all 320ms ease-in-out"
            >
              {taskList.data !== undefined &&
                pointTiers.map((pointGroup) => {
                  const pointData = taskList.data.tasks.find(
                    (x) => x.points === pointGroup
                  );
                  return (
                    <TitledContainer
                      key={pointGroup}
                      title={`${pointGroup} Point Tasks`}
                      bottomElement={
                        <NewTask points={pointGroup} type="task" />
                      }
                    >
                      {pointData?.tasks.map((task) => {
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
            <Flex
              flexDir="column"
              position="absolute"
              rowGap="10"
              w="full"
              maxW="6xl"
              transform={
                selectedList !== "reward" ? "translateX(200%)" : "auto"
              }
              transition="all 320ms ease-in-out"
            >
              {rewardList.data !== undefined &&
                pointTiers.map((pointGroup) => {
                  const pointData = rewardList.data.find(
                    (x) => x.points === pointGroup
                  );
                  return (
                    <TitledContainer
                      key={pointGroup}
                      title={`${pointGroup} Point Rewards`}
                      bottomElement={
                        <NewTask points={pointGroup} type="reward" />
                      }
                    >
                      {pointData?.rewards.map((reward) => {
                        return (
                          <TaskCard
                            task={reward.name}
                            type={"reward"}
                            cardId={reward.id}
                            key={reward.id}
                          />
                        );
                      })}
                    </TitledContainer>
                  );
                })}
            </Flex>
          </Box>
        </Flex>
        {selectedRewardTier !== null && (
          <RewardModal
            selectedRewardTier={selectedRewardTier}
            onSelection={() => setSelectedRewardTier(null)}
          />
        )}

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
      </Stack>
    </PageLayout>
  );
}
