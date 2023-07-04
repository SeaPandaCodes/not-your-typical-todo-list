import { trpc } from "@/utils/trpc";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";

export const GoalProgressBar: React.FC = () => {
  const currentPoints = trpc.currentPoints.useQuery();
  const pointBalance = currentPoints.data?.point_balance;

  if (pointBalance === undefined) {
    return;
  }

  const sectionOne = (1 / 6) * 100;
  const sectionTwo = (2 / 6) * 100;
  const sectionThree = (3 / 6) * 100;

  return (
    <Flex flexDirection="column" w="full" position="relative" pb="2" mt="64px">
      <Flex
        transform="translateX(-50%) translateY(-120%)"
        position="absolute"
        flexDirection="column"
        alignItems="center"
        transition="left 250ms ease-in-out"
        top="0"
        left={(Math.min(pointBalance / 60, 1) * 100).toString() + "%"}
      >
        <Text>{pointBalance}</Text>
        <TriangleDownIcon boxSize={6} />
      </Flex>

      <Box
        w="full"
        m="0 auto"
        position="relative"
        overflow="hidden"
        borderRadius="md"
      >
        <Flex
          w="full"
          h="12"
          bgGradient="linear(to-r, purple.100, purple.400, purple.800)"
          direction="row"
          transition="all 0.5s ease-in-out"
        >
          <Box
            w={`calc(${sectionOne}% + 4px)`}
            borderRight="4px"
            borderColor="var(--chakra-colors-chakra-body-bg)"
          />
          <Box
            w={`calc(${sectionTwo}% + 4px)`}
            borderRight="4px"
            borderColor="var(--chakra-colors-chakra-body-bg)"
          />
          <Box
            w={`calc(${sectionThree}% +  4px)`}
            borderRight="4px"
            borderColor="var(--chakra-colors-chakra-body-bg)"
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
