import styles from "@/styles/Home.module.css";
import { Header } from "@/components/Header";
import {
  Box,
  Flex,
  SimpleGrid,
  Link,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Stack,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Modal,
  Text,
  Grid,
  GridItem,
  VStack,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/next-js";
import { TaskCard } from "@/components/TaskCard";
import data from "./test/testData.json";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { RewardModal } from "@/components/RewardModal";
import IMG_FOX from "../img/FOX.png";

export default function Home() {
  const utils = trpc.useContext();
  const taskList = trpc.tasks.useQuery();
  const currentPoints = trpc.currentPoints.useQuery();
  const availableRewards = trpc.availableRewards.useQuery();

  function refetch() {
    taskList.refetch();
    currentPoints.refetch();
    console.log("fetch");
  }

  let reward: number = 0;

  let rewardList = availableRewards.data?.filter(
    ({ points }) => points === reward
  );

  if (rewardList && rewardList?.length > 0) {
    console.log(rewardList[0]?.rewards);
  }

  const [selectedRewardTier, setSelectedRewardTier] = useState<number | null>(
    null
  );

  const pointBalance = currentPoints.data?.point_balance;

  return (
    <Box h="100vh" flex={"column"}>
      <Header title="Test"></Header>
      <Stack flex={"column"} justify={"center"} align={"center"}>
        <Flex flex="row" justify={"center"} align={"center"}>
          <Image priority src={IMG_FOX} alt="Fox" />
        </Flex>

        <Flex
          justifyContent="center"
          alignItems="center"
          direction="column"
          w="full"
          maxW="6xl"
          mx="auto"
          px={{ base: "4", md: "24" }}
          transition="all 250ms ease-in-out"
          rowGap="14"
        >
          {pointBalance !== undefined && (
            <Flex direction="column" w="full">
              <Box color="yellow.200">{pointBalance}</Box>
              <Grid
                templateColumns="repeat(6, 1fr)"
                templateRows="repeat(3, 1fr)"
                w="full"
                h="180"
              >
                <GridItem
                  // colStart={
                  //   pointBalance > 60
                  //     ? 6
                  //     : pointBalance / 10
                  // }
                  colSpan={6}
                  w="full"
                  rowStart={1}
                  position="relative"
                  // alignItems={
                  //   pointBalance >= 60
                  //     ? "flex-end"
                  //     : "center"
                  // }
                  pb="2"
                >
                  <Flex
                    transform="translateX(-50%)"
                    position="absolute"
                    flexDirection="column"
                    alignItems="center"
                    transition="left 250ms ease-in-out"
                    left={
                      (Math.min(pointBalance / 60, 1) * 100).toString() + "%"
                    }
                  >
                    <Text>{pointBalance}</Text>
                    <TriangleDownIcon boxSize={6} />
                  </Flex>
                </GridItem>

                <GridItem
                  bg="pink.100"
                  colSpan={1}
                  w="full"
                  rowStart={2}
                ></GridItem>
                <GridItem bg="pink.300" colSpan={2} rowStart={2}></GridItem>
                <GridItem bg="pink.800" colSpan={3} rowStart={2}></GridItem>
                <GridItem
                  rowStart={3}
                  colSpan={2}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    wordBreak="break-word"
                    onClick={() => {
                      setSelectedRewardTier(10);
                    }}
                    onMouseEnter={() => {
                      utils.availableRewards.prefetch();
                    }}
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
                    wordBreak="break-word"
                    onClick={() => {
                      setSelectedRewardTier(30);
                    }}
                    onMouseEnter={() => {
                      utils.availableRewards.prefetch();
                    }}
                    isDisabled={pointBalance < 20}
                  >
                    Redeem Medium
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
                    wordBreak="break-word"
                    transform="translateX(50%)"
                    onClick={() => {
                      setSelectedRewardTier(60);
                    }}
                    onMouseEnter={() => {
                      utils.availableRewards.prefetch();
                    }}
                    isDisabled={pointBalance < 60}
                  >
                    Redeem Difficult
                  </Button>
                </GridItem>
              </Grid>
            </Flex>
          )}
          <SimpleGrid spacing={4} w="full">
            {taskList.isSuccess &&
              taskList.data.tasks.map((pointGroup) => {
                return (
                  <>
                    {pointGroup.tasks.map((task) => {
                      return (
                        <TaskCard
                          task={task.name}
                          type={"task"}
                          cardId={task.id}
                          key={task.id}
                          refetch={refetch}
                        />
                      );
                    })}
                  </>
                );
              })}

            {/* <TaskCard
            task={`HHHHHHHHDASHDKJHASKJDHLKJAJSKDJKLSJDKLJSALKDJLKSJDKLJSLSADKJDLKAJWLKDJLKWAJDLKJAWLKDJLKWJA
              SLKDJKLAJDLKJWfsddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddLAKJDKLJLKSAJLKDJSKLWHDNJKAWNFKLDNFKSNAs`}
            checkbox={true}
          /> */}
          </SimpleGrid>
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
    </Box>
  );
}
