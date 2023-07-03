import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Link,
  SimpleGrid,
  Switch,
} from "@chakra-ui/react";
import { TaskCard } from "@/components/TaskCard";
import { trpc } from "@/utils/trpc";

const Rewards: React.FC = () => {
  const rewardList = trpc.availableRewards.useQuery();

  return (
    <Box h="full" mb="20">
      <Flex
        justifyContent="center"
        alignItems="center"
        w="full"
        maxW="6xl"
        mx="auto"
        px={{ base: "4", md: "24" }}
        transition="all 250ms ease-in-out"
      >
        <SimpleGrid spacing={4} w="full">
          {rewardList.data !== undefined &&
            rewardList.data.map((rewardGroup) => {
              return (
                <Flex
                  key={rewardGroup.points}
                  flexDir="column"
                  rowGap={5}
                  m={5}
                  border="4px"
                  p="8"
                  borderColor="purple.800"
                  borderRadius="xl"
                >
                  <Heading
                    mt="-50px"
                    mb={2}
                    fontSize="2xl"
                    bg="var(--chakra-colors-chakra-body-bg)"
                    mx="5"
                    px="5"
                    w="fit-content"
                  >
                    {rewardGroup.points} Point Rewards
                  </Heading>
                  {rewardGroup.rewards.map((reward) => {
                    return (
                      <TaskCard
                        task={reward.name}
                        type={"reward"}
                        key={reward.id}
                        cardId={reward.id}
                      />
                    );
                  })}
                </Flex>
              );
            })}

          {/* <TaskCard
            task={`HHHHHHHHDASHDKJHASKJDHLKJAJSKDJKLSJDKLJSALKDJLKSJDKLJSLSADKJDLKAJWLKDJLKWAJDLKJAWLKDJLKWJA
              SLKDJKLAJDLKJWfsddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddLAKJDKLJLKSAJLKDJSKLWHDNJKAWNFKLDNFKSNAs`}
            checkbox={true}
          /> */}
        </SimpleGrid>
      </Flex>
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
    </Box>
  );
};

export default Rewards;
