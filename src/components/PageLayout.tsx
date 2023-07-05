import { Box, Flex } from "@chakra-ui/react";
import { Header } from "./Header";
import React from "react";
import { Wave } from "./Wave";

export const PageLayout: React.FC<
  React.PropsWithChildren<{
    buttonSpace?: number;
  }>
> = ({ children, buttonSpace }) => {
  return (
    <Box minH="100vh">
      <Header />
      <Flex as="main" direction="column" pt="96px" pos="relative" pb="200px">
        {children}
      </Flex>
      <Wave />
    </Box>
  );
};
