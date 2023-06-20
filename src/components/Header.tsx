import { Box, Flex, Heading, Button, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import React from "react";

export const Header: React.FC<{ title: string }> = ({ title }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      flexDirection="column"
      justify={"center"}
      alignItems="center"
      bg="teal.400"
    >
      <Flex flexDirection="row" alignItems="center"></Flex>
      <Flex flexDirection="row" alignItems="center"></Flex>
      <Heading as="h2" size="lg" textAlign="center">
        {title}
      </Heading>
      <Box as="hr" borderColor="gray.200" my="2" />
      <Button onClick={() => toggleColorMode()}>
        {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      </Button>
    </Flex>
  );
};
