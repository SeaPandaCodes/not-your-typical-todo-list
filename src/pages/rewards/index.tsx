import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Link,
  SimpleGrid,
  Switch,
} from "@chakra-ui/react";
import { TaskCard } from "@/components/TaskCard";
import { trpc } from "@/utils/trpc";

const Rewards: React.FC = () => {
  const rewardList = trpc.availableRewards.useQuery();

  return (
    <Box h="full">
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
                <React.Fragment key={rewardGroup.points}>
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
                </React.Fragment>
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
