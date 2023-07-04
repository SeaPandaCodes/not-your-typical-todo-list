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

const NewTask: React.FC<{ points: number }> = ({ points }) => {
  const addTask = trpc.addTask.useMutation();
  const utils = trpc.useContext();

  const [taskName, setTaskName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: { preventDefault?: () => void }) => {
    e?.preventDefault?.();
    const parseResult = taskCreationSchema.safeParse({
      name: taskName,
      points: points.toString(),
    });

    if (!parseResult.success) return;

    setLoading(true);
    await addTask.mutateAsync(parseResult.data);
    await utils.tasks.refetch();
    setLoading(false);
    setTaskName("");
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
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <Button
        variant="ghost"
        isLoading={loading}
        onClick={() => handleSubmit()}
        w="40px"
        isDisabled={taskName.trim().length === 0}
      >
        <PlusSquareIcon />
      </Button>
    </Grid>
  );
};

export default function Home() {
  const utils = trpc.useContext();
  const taskList = trpc.tasks.useQuery();
  const currentPoints = trpc.currentPoints.useQuery();

  const [selectedRewardTier, setSelectedRewardTier] = useState<number | null>(
    null
  );

  const pointBalance = currentPoints.data?.point_balance;

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
          <Flex flexDir="row" columnGap="10">
            <Heading
              textAlign="center"
              fontSize="2xl"
              mb="6"
              borderColor="purple.500"
              // borderBottom
            >
              Tasks
            </Heading>
            <Heading textAlign="center" fontSize="2xl" mb="6">
              Rewards
            </Heading>
          </Flex>

          <Flex flexDir="column" rowGap="10" w="full" maxW="6xl">
            {taskList.data !== undefined &&
              taskList.data.tasks.map((pointGroup) => {
                return (
                  <TitledContainer
                    key={pointGroup.points}
                    title={`${pointGroup.points} Point Tasks`}
                    bottomElement={<NewTask points={pointGroup.points} />}
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
