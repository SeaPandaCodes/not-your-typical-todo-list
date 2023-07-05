import { Divider, Flex, Heading } from "@chakra-ui/react";
import React from "react";

export const TitledContainer: React.FC<{
  title: string;
  children?: React.ReactElement[];
  bottomElement?: React.ReactElement;
  id?: string;
  color: string;
}> = ({ title, children, bottomElement, id, color }) => {
  return (
    <Flex
      mt="18px"
      id={id}
      // mb={title.includes("60") ? "180px" : "0px"}
      flexDir="column"
      rowGap={{ base: "2", md: "4" }}
      border="4px"
      p="4"
      pt={{ base: "6", md: "8" }}
      borderColor={`${color}.800`}
      _light={{
        borderColor: `${color}.600`,
        bg: "orange.50",
      }}
      bg="gray.800"
      borderRadius="xl"
      pos="relative"
      alignItems="center"
      // overflowX="hidden"
      // overflowX="hidden"
    >
      <Heading
        pos="absolute"
        left={{
          base: "auto",
          md: "14",
        }}
        top="0"
        transform="translateY(-60%)"
        textAlign="center"
        fontSize={{
          base: "md",
          md: "2xl",
        }}
        _light={{
          bg: "orange.50",
        }}
        bg="gray.800"
        px="5"
        py="1"
        rounded="full"
      >
        {title}
      </Heading>
      {children &&
        React.Children.map(children, (child, index) => (
          <React.Fragment key={child.key}>
            {child}
            {(index !== React.Children.count(children) - 1 ||
              bottomElement) && (
              <Divider
                borderBottomWidth={{
                  base: "1px",
                  md: "2px",
                }}
              />
            )}
          </React.Fragment>
        ))}
      {bottomElement}
    </Flex>
  );
};
