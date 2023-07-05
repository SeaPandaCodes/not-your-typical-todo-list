import { GoalProgressBar } from "@/components/GoalProgressBar";
import { PageLayout } from "@/components/PageLayout";
import { RewardModal } from "@/components/RewardModal";
import { TaskCard } from "@/components/TaskCard";
import { TitledContainer } from "@/components/TitledContainer";
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
  Stack,
  keyframes,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import IMG_LOGO from "../img/FishLogo.svg";
import { TutorialModal } from "@/components/TutorialModal";
import * as z from "zod";

const taskCreationSchema = z.strictObject({
  name: z.string().trim().min(1, { message: "Required" }),
  points: z
    .string()
    .transform((s) => parseInt(s))
    .refine((s) => !Number.isNaN(s), { message: "Required" })
    .pipe(z.number().positive().max(100).min(10, { message: "Required" })),
});

const rewardCreationSchema = z.strictObject({
  name: z.string().min(1, { message: "Required" }),
  points: z
    .string()
    .transform((s) => (s !== null ? parseInt(s) : s))
    .refine((s) => !Number.isNaN(s), { message: "Required" })
    .pipe(z.number().positive().max(100).min(10, { message: "Required" })),
  maxRedemptions: z
    .string()
    .nullable()
    .transform((s) => parseInt(s as string) || null)
    .pipe(
      z
        .number()
        .positive()
        .max(10000)
        .min(1, { message: "Required" })
        .nullable()
    ),
});

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
        placeholder={
          type === "task" ? "Write new task..." : "Write new reward..."
        }
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
  const toast = useToast();

  useEffect(() => {
    return;
  }, []);

  const { colorMode } = useColorMode();

  const spin = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(180deg)}
`;

  const spinBack = keyframes`
from {transform: rotate(180deg);}
to {transform: rotate(360deg)}
`;
  const spinAnimation = `${spin} 1.25s cubic-bezier(1,-0.7, 0.5, 1.01)`;
  const spinBackAnimation = `${spinBack} 1.25s cubic-bezier(1,-0.7, 0.5, 1.01)`;

  const columnsContainerRef = useRef<HTMLDivElement>(null);
  const taskContainerRef = useRef<HTMLDivElement>(null);
  const rewardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const columnsContainer = columnsContainerRef.current;
    const taskContainer = taskContainerRef.current;
    const rewardContainer = rewardContainerRef.current;

    if (
      columnsContainer === null ||
      taskContainer === null ||
      rewardContainer === null
    ) {
      return;
    }

    const activeContainer =
      selectedList === "task" ? taskContainer : rewardContainer;

    const { height: startingHeight } = activeContainer.getBoundingClientRect();
    columnsContainer.style.height = startingHeight + "px";

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === activeContainer) {
          const { height } = activeContainer.getBoundingClientRect();
          columnsContainer.style.height = height + "px";
        }
      }
    });

    resizeObserver.observe(activeContainer);

    return () => {
      resizeObserver.disconnect();
    };
  }, [selectedList]);

  return (
    <PageLayout buttonSpace={120}>
      <TutorialModal />
      <Stack flex={"column"} justify={"center"} align={"center"}>
        <Flex
          flex="row"
          justify={"center"}
          align={"center"}
          bg="black"
          borderRadius={"100%"}
          animation={colorMode === "dark" ? spinAnimation : spinBackAnimation}
          _light={{
            transform: "rotate(360deg)",
          }}
          border="2px solid black"
          transform="rotate(180deg)"
          transition="all 250ms ease-in-out"
        >
          <Image
            src={IMG_LOGO}
            priority={true}
            width={340}
            height={340}
            alt="Fish Logo"
            w={{ base: "240px", md: "340px" }}
            h={{ base: "240px", md: "340px" }}
          />
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
                  <Button
                    bg="orange.50"
                    _dark={{
                      bg: "gray.800",
                    }}
                    w="60px"
                    wordBreak="break-word"
                    onClick={() => {
                      if (
                        rewardList.data === undefined ||
                        rewardList.data.find((x) => x.points === 10) ===
                          undefined
                      ) {
                        setSelectedList("reward");

                        toast({
                          title: "No 10 Point Rewards",
                          description: "Please create a reward to redeem",
                          status: "warning",
                          duration: 6000,
                          position: "bottom",
                          isClosable: true,
                        });

                        setTimeout(() => {
                          document.getElementById("reward-10")?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                        }, 440);
                      } else {
                        setSelectedRewardTier(10);
                      }
                    }}
                    onMouseEnter={() => {
                      utils.availableRewards.prefetch();
                    }}
                    border={pointBalance < 10 ? "none" : "2px"}
                    borderColor="teal.200"
                    isDisabled={pointBalance < 10}
                  >
                    -10
                  </Button>
                </GridItem>
                <GridItem
                  rowStart={3}
                  colSpan={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    bg="orange.50"
                    _dark={{
                      bg: "gray.800",
                    }}
                    w="60px"
                    wordBreak="break-word"
                    onClick={() => {
                      if (
                        rewardList.data === undefined ||
                        rewardList.data.find((x) => x.points === 30) ===
                          undefined
                      ) {
                        setSelectedList("reward");
                        setTimeout(() => {
                          document.getElementById("reward-30")?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                        }, 440);
                        toast({
                          title: "No 30 Point Rewards",
                          description: "Please create a reward to redeem",
                          status: "warning",
                          duration: 6000,
                          position: "bottom",
                          isClosable: true,
                        });
                      } else {
                        setSelectedRewardTier(30);
                      }
                    }}
                    onMouseEnter={() => {
                      utils.availableRewards.prefetch();
                    }}
                    isDisabled={pointBalance < 30}
                    border={pointBalance < 30 ? "none" : "2px"}
                    borderColor="teal.400"
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
                    bg="orange.50"
                    _dark={{
                      bg: "gray.800",
                    }}
                    w="60px"
                    wordBreak="break-word"
                    onClick={() => {
                      if (
                        rewardList.data === undefined ||
                        rewardList.data.find((x) => x.points === 60) ===
                          undefined
                      ) {
                        setSelectedList("reward");
                        setTimeout(() => {
                          document.getElementById("reward-60")?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }, 440);
                        toast({
                          title: "No 60 Point Rewards",
                          description: "Please create a reward to redeem",
                          status: "warning",
                          duration: 6000,
                          position: "bottom",
                          isClosable: true,
                        });
                      } else {
                        setSelectedRewardTier(60);
                      }
                    }}
                    onMouseEnter={() => {
                      utils.availableRewards.prefetch();
                    }}
                    isDisabled={pointBalance < 60}
                    border={pointBalance < 60 ? "none" : "2px"}
                    borderColor="teal.800"
                  >
                    -60
                  </Button>
                </GridItem>
              </Grid>
            </Flex>
          )}
          <Divider my="8" />
          <Box
            borderWidth="2px"
            mb="6"
            position="relative"
            borderRadius="8"
            overflow="hidden"
            zIndex="5"
            _light={{
              bg: "orange.50",
            }}
            bg="gray.800"
          >
            <Box
              position="absolute"
              w="50%"
              h="full"
              bg={selectedList !== "task" ? "teal.400" : "purple.400"}
              transform={selectedList !== "task" ? "translateX(100%)" : "auto"}
              transition="all 320ms ease-in-out"
              zIndex="-1"
            />
            <Flex flexDir="row" cursor="pointer">
              <Heading
                textAlign="center"
                fontSize={{ base: "md", md: "xl" }}
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
                fontSize={{ base: "md", md: "xl" }}
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
          <Box position="relative" w="full" ref={columnsContainerRef}>
            <Flex
              position="absolute"
              flexDir="column"
              rowGap="10"
              w="full"
              maxW="6xl"
              // h={selectedList !== "task" ? "100vh" : "auto"}
              overflow={selectedList !== "task" ? "hidden" : "visible"}
              transform={
                selectedList !== "task" ? "translateX(-120vw)" : "auto"
              }
              transition="all 400ms ease-in-out"
              mt="5px"
              ref={taskContainerRef}
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
                      color="purple"
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
              overflow={selectedList !== "reward" ? "hidden" : "visible"}
              // h={selectedList !== "reward" ? "100vh" : "auto"}
              transform={
                selectedList !== "reward" ? "translateX(120vw) " : "auto"
              }
              transition="all 400ms ease-in-out"
              ref={rewardContainerRef}
            >
              {rewardList.data !== undefined &&
                pointTiers.map((pointGroup) => {
                  const pointData = rewardList.data.find(
                    (x) => x.points === pointGroup
                  );
                  return (
                    <TitledContainer
                      id={"reward" + "-" + pointGroup}
                      key={pointGroup}
                      title={`${pointGroup} Point Rewards`}
                      bottomElement={
                        <NewTask points={pointGroup} type="reward" />
                      }
                      color="teal"
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
      </Stack>
    </PageLayout>
  );
}
