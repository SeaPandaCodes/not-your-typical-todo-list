import styles from "@/styles/Home.module.css";
import { Header } from "@/components/Header";
import {
  Box,
  Image,
  Flex,
  SimpleGrid,
  Link,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Stack,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Modal,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { TaskCard } from "@/components/TaskCard";
import data from "./test/testData.json";
import { useState } from "react";
import { trpc } from "@/utils/trpc";

export default function Home() {
  const filteredData = data.filter(({ type }) => type === "TASK");
  const taskList = trpc.tasks.useQuery();
  const currentPoints = trpc.currentPoints.useQuery();

  const { isOpen, onOpen, onClose } = useDisclosure();

  function refetch() {
    taskList.refetch();
    currentPoints.refetch();
    console.log("fetch");
  }

  console.log(currentPoints.data);

  return (
    <Box h="100vh" flex={"column"}>
      <Header title="Test"></Header>
      <Stack flex={"column"} justify={"center"} align={"center"}>
        <Flex flex="row" justify={"center"} align={"center"}>
          <Image
            src="data:image/png;base64,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"
            alt="Fox"
          />
        </Flex>
        {currentPoints.isSuccess && (
          <Box color="yellow.200">{currentPoints.data.point_balance}</Box>
        )}

        <CircularProgress value={40} color="green.400" size="180px">
          <CircularProgressLabel>
            {/* <div
              style={{
                backgroundColor: "green",
                // position: "absolute",
                // rotate: "10deg",
              }}
            > */}{" "}
            <div
            // style={{
            //   backgroundColor: "green",
            //   // position: "absolute",
            //   rotate: "45deg",
            // }}
            >
              {
                filteredData.filter(({ completed }) => completed === true)
                  .length
              }{" "}
              / {filteredData.length}
            </div>
            {/* </div>{" "} */}
          </CircularProgressLabel>
        </CircularProgress>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="email-alerts" mb="0">
            View Completed Tasks
          </FormLabel>
          <Switch id="completed-tasks" />
        </FormControl>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // margin: "20px",

            width: "100%",
            boxSizing: "border-box",
            maxWidth: "100rem",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "1.875rem",
            paddingRight: "1.875rem",
          }}
        >
          <SimpleGrid spacing={4} w={"80%"} minWidth={"150px"}>
            {taskList.isSuccess &&
              taskList.data.tasks.map((pointGroup) => {
                return (
                  <>
                    {pointGroup.tasks.map((task) => {
                      return (
                        <TaskCard
                          task={task.name}
                          checkbox={true}
                          cardId={task.id}
                          key={task.id}
                          refetch={refetch}
                        />
                      );
                    })}
                  </>
                );
              })}

            {/* <TaskCard
            task={`HHHHHHHHDASHDKJHASKJDHLKJAJSKDJKLSJDKLJSALKDJLKSJDKLJSLSADKJDLKAJWLKDJLKWAJDLKJAWLKDJLKWJA
              SLKDJKLAJDLKJWfsddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddLAKJDKLJLKSAJLKDJSKLWHDNJKAWNFKLDNFKSNAs`}
            checkbox={true}
          /> */}
          </SimpleGrid>
        </div>
        <>
          <Button onClick={onOpen}>Open Modal</Button>

          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent maxW="56rem">
              <ModalHeader>Congrats!!!</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Image
                  src="https://etc.usf.edu/clipart/72400/72419/72419_rey_finding_lg.gif"
                  alt="Fox"
                />
                Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
                ullamco deserunt aute id consequat veniam incididunt duis in
                sint irure nisi. Mollit officia cillum Lorem ullamco minim
                nostrud elit officia tempor esse quis. Sunt ad dolore quis aute
                consequat. Magna exercitation reprehenderit magna aute tempor
                cupidatat consequat elit dolor adipisicing. Mollit dolor eiusmod
                sunt ex incididunt cillum quis. Velit duis sit officia eiusmod
                Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                nisi consectetur esse laborum eiusmod pariatur proident Lorem
                eiusmod et. Culpa deserunt nostrud ad veniam.
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

        <Link href="tasks/creation">
          <Button
            colorScheme="teal"
            size="lg"
            position="fixed"
            bottom="20px"
            right="20px"
          >
            Add Task
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}
