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
  Divider,
} from "@chakra-ui/react";
import { TaskCard } from "@/components/TaskCard";
import { trpc } from "@/utils/trpc";
import { PageLayout } from "@/components/PageLayout";
import { TitledContainer } from "@/components/TitledContainer";

const Rewards: React.FC = () => {
  const rewardList = trpc.availableRewards.useQuery();

  return (
    <PageLayout buttonSpace={120}>
      <Flex
        justifyContent="center"
        alignItems="center"
        w="full"
        maxW="4xl"
        mx="auto"
        px={{ base: "4", md: "24" }}
        transition="all 250ms ease-in-out"
      >
        <Flex flexDir="column" rowGap="10" w="full">
          {rewardList.data !== undefined &&
            rewardList.data.map((rewardGroup) => {
              return (
                <TitledContainer
                  key={rewardGroup.points.toString()}
                  title={`${rewardGroup.points} Point Rewards`}
                >
                  {rewardGroup.rewards.map((reward, index) => {
                    return (
                      <TaskCard
                        task={reward.name}
                        type={"reward"}
                        key={reward.id}
                        cardId={reward.id}
                      />
                    );
                  })}
                </TitledContainer>
              );
            })}
        </Flex>
      </Flex>
    </PageLayout>
  );
};

export default Rewards;
