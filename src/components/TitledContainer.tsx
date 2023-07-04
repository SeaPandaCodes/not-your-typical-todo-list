import { Divider, Flex, Heading } from "@chakra-ui/react";
import React from "react";

export const TitledContainer: React.FC<{
  title: string;
  children: React.ReactElement[];
  bottomElement?: React.ReactElement;
}> = ({ title, children, bottomElement }) => {
  return (
    <Flex
      flexDir="column"
      rowGap={{ base: "2", md: "4" }}
      border="4px"
      p="4"
      pt={{ base: "6", md: "8" }}
      borderColor="purple.800"
      _light={{
        borderColor: "purple.600",
      }}
      borderRadius="xl"
      bg="var(--chakra-colors-chakra-body-bg)"
      pos="relative"
      alignItems="center"
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
        bg="var(--chakra-colors-chakra-body-bg)"
        px="5"
        py="1"
        rounded="full"
      >
        {title}
      </Heading>
      {React.Children.map(children, (child, index) => (
        <React.Fragment key={child.key}>
          {child}
          {(index !== React.Children.count(children) - 1 || bottomElement) && (
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
