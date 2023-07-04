import { trpc } from "@/utils/trpc";
import {
  CloseIcon,
  HamburgerIcon,
  InfoIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { Image, Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Stack,
  Text,
  Tooltip,
  useColorMode,
  useDisclosure,
  useOutsideClick,
  Heading,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React from "react";
import FOX_IMG from "../img/FOX.png";
import IMG_LOGO from "../img/FishLogo.svg";

// interface LinkItem {
//   path: string;
//   title: string;
// }

// const links: Array<LinkItem> = [
//   {
//     path: "/",
//     title: "Home",
//   },
//   {
//     path: "/tasks",
//     title: "Tasks",
//   },
//   {
//     path: "/tasks/creation",
//     title: "Create Task",
//   },
//   {
//     path: "/rewards",
//     title: "Rewards",
//   },
//   {
//     path: "/rewards/creation",
//     title: "Create Reward",
//   },
// ];

export const Header: React.FC<{ title?: string }> = ({ title }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const pathname = usePathname();
  // const currentPage = links.find((link) => link.path === pathname);
  const ref = React.useRef<HTMLInputElement>(null);

  const sessionId = trpc.getSessionId.useQuery();

  return (
    <Box as="header" position="fixed" top={0} left={0} w="full" zIndex={10}>
      <Flex
        flexDirection="row"
        justify="space-between"
        alignItems="center"
        bg="teal.400"
        minH={"60px"}
        w="full"
        py="2"
        px="4"
      >
        <Flex
          flexDirection="row"
          columnGap={5}
          w="full"
          justify={{ base: "center", md: "start" }}

          // ml={10}
        >
          <Box
            position={{ base: "absolute", md: "relative" }}
            left={{ base: "50%", md: "auto" }}
            top={{ base: "30", md: "auto" }}
            transform={{
              base: "translateX(-50%) translateY(-50%)",
              md: "auto",
            }}
            transition="none"
          >
            <Image
              src={IMG_LOGO}
              priority
              boxSize="40px"
              alt="Fish Logo"
              bgColor={"black"}
              borderRadius={"100%"}
            />
          </Box>
          <Flex
            flex={{ base: 1 }}
            display={{ base: "none", md: "flex" }}
            w="full"
            columnGap="4"
            // ml="6"
            alignItems="center"
            // justifyContent="center"
          >
            <Heading fontSize="2xl">Not Your Typical To-Do List</Heading>
            {/* {links.map((link) => {
              return (
                <React.Fragment key={link.path}>
                  <Link
                    href={link.path}
                    display="flex"
                    flexDir="row"
                    alignItems="center"
                    justifyContent="center"
                    textDecor="none"
                    transitionProperty="all"
                    transitionDuration=".6s"
                    transitionTimingFunction="ease"
                    position="relative"
                    fontSize="lg"
                    _hover={{
                      textDecor: "none",
                      _after: {
                        // width: "100%",
                        transform: `scaleX(1)`,
                      },
                    }}
                    _after={{
                      transition: "all 280ms ease-in-out",
                      bottom: 1,
                      content: '""',
                      position: "absolute",
                      margin: "0 auto",
                      borderBottom: "2px",
                      w: "full",
                      transform: `scaleX(${
                        currentPage?.path === link.path ? 1 : 0
                      })`,
                    }}
                  >
                    {link.title}
                  </Link>
                </React.Fragment>
              );
            })} */}
          </Flex>
        </Flex>
        <Flex columnGap="2">
          <Tooltip
            label={`Switch to ${
              colorMode === "dark" ? "Light Mode" : "Dark Mode"
            }`}
          >
            <Button onClick={() => toggleColorMode()} w="50" variant="ghost">
              {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            </Button>
          </Tooltip>

          <Tooltip label={`Session id: ${sessionId.data}`}>
            <Button
              variant="ghost"
              onClick={() => {
                alert(
                  `Your session id is ${sessionId.data}. It was generated when you first visited this site.`
                );
              }}
            >
              <InfoIcon />
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
      {/* <Collapse in={isOpen} animateOpacity ref={ref}>
        <MobileNav />
        <Box
          position="fixed"
          inset="0"
          top="60px"
          bg="rgba(0, 0, 0, 0.85)"
          zIndex="1"
          onClick={() => onClose()}
        />
      </Collapse> */}
    </Box>
  );
};
