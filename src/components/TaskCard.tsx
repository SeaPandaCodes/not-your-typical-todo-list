import { DeleteIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Flex,
  Heading,
  IconButton,
  Text,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
  Button,
} from "@chakra-ui/react";
import React from "react";

export const TaskCard: React.FC<{
  task: string;
  checkbox: boolean;
  onTaskChecked?: any;
}> = ({ task, checkbox, onTaskChecked }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        variant="elevated"
        align="center"
        padding="0 30px 0  30px"
        borderRadius={"20px"}
        bg="orange.200"
        color={"gray.600"}
        // minW="80%"
        // w="full"
        // transition="all 250ms cubic-bezier(0.555, -0.435, 0.310, 1.470)"
        transition="all 250ms ease-in-out"
        _hover={{ transform: "scale(1.02)" }}
        // _active={{ transform: "scale(0.95)" }}
      >
        {checkbox === true && (
          <Checkbox size="lg" colorScheme="green" onClick={onOpen}></Checkbox>
        )}

        {/* <CardHeader>
        <Heading size="md" flexWrap="wrap">
          {task}
        </Heading>
      </CardHeader> */}
        <CardBody>
          <Flex wrap={"wrap"}>
            <Text>{task}</Text>
          </Flex>
        </CardBody>
        <CardFooter>
          <IconButton
            // variant="outline"
            colorScheme="teal"
            aria-label="Send email"
            icon={<DeleteIcon />}
          />
        </CardFooter>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
            ullamco deserunt aute id consequat veniam incididunt duis in sint
            irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
            officia tempor esse quis. Sunt ad dolore quis aute consequat. Magna
            exercitation reprehenderit magna aute tempor cupidatat consequat
            elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt
            cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim
            laboris do dolor eiusmod. Et mollit incididunt nisi consectetur esse
            laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt
            nostrud ad veniam.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
