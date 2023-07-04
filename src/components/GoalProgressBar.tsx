import { trpc } from "@/utils/trpc";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";

export const GoalProgressBar: React.FC = () => {
  const currentPoints = trpc.currentPoints.useQuery();

  const [selectedRewardTier, setSelectedRewardTier] = useState<number | null>(
    null
  );

  const pointBalance = currentPoints.data?.point_balance;

  if (pointBalance === undefined) {
    return;
  }

  const sectionOne = (1 / 6) * 100;
  const sectionTwo = (2 / 6) * 100;
  const sectionThree = (3 / 6) * 100;

  console.log(sectionOne);

  return (
    <Flex flexDirection="column" w="full" position="relative" pb="2">
      <Flex
        transform="translateX(-50%)"
        position="absolute"
        flexDirection="column"
        alignItems="center"
        transition="left 250ms ease-in-out"
        left={(Math.min(pointBalance / 60, 1) * 100).toString() + "%"}
      >
        <Text>{pointBalance}</Text>
        <TriangleDownIcon boxSize={6} />
      </Flex>
      <Box w="full" m="0 auto" position="relative" overflow="hidden">
        <Flex
          w="full"
          h="12"
          bgGradient="linear(to-r, purple.200, purple.400, purple.800)"
          direction="row"
          transition="all 0.5s ease-in-out"
        >
          <Box
            w={`${sectionOne}%`}
            borderRight="2px"
            borderColor="purple.900"
          />
          <Box
            w={`${sectionTwo}%`}
            borderRight="2px"
            borderColor="purple.900"
          />
          <Box
            w={`${sectionThree}%`}
            borderRight="2px"
            borderColor="purple.900"
          />
        </Flex>
        <Box
          bg="var(--chakra-colors-chakra-body-bg)"
          opacity="80%"
          position="absolute"
          top={0}
          // right={0}
          left={(Math.min(pointBalance / 60, 1) * 100).toString() + "%"}
          transition="left 250ms ease-in-out"
          h="full"
          w="full"
        />
      </Box>
    </Flex>
  );
};
