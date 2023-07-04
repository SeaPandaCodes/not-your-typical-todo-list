import {
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

export const TutorialModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    // <Modal isOpen={true} onClose={onClose} isCentered>
    //   <ModalOverlay />
    //   <ModalContent maxW="56rem">
    //     <ModalHeader></ModalHeader>
    //     <ModalCloseButton />
    //     <ModalBody>
    //       <VStack>
    //         <Text fontSize="4xl">Welcome to Not Your Typical To-Do List</Text>
    //       </VStack>
    //     </ModalBody>
    //   </ModalContent>
    // </Modal>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="blur(2px)" />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="5">
          <VStack>
            <Heading>🐳 Welcome to Not Your Typical To-Do List!</Heading>
            <Divider borderBottomWidth="2px" />
            <Text>
              Complete tasks to gain points. Use those points to unlock rewards!
            </Text>
            <Text>
              I've provided you with example tasks and rewards use the "Write
              new" box to add your own for each point range.
            </Text>
            <Text>
              You can toggle between tasks and rewards to add to or view them.
            </Text>
            <Text>
              Click the -10, -30, or -60 when you are ready to claim your
              reward.
            </Text>
          </VStack>
        </ModalBody>

        {/* <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};
