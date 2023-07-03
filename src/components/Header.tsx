import {
  Flex,
  Heading,
  Button,
  useColorMode,
  Box,
  Stack,
  Text,
  useDisclosure,
  Collapse,
  IconButton,
  useBreakpointValue,
  useOutsideClick,
  Tooltip,
  AspectRatio,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import { Image, Link } from "@chakra-ui/next-js";
import { usePathname } from "next/navigation";
import FOX_IMG from "../img/FOX.png";
import ICON_IMG from "../img/Icon.jpeg";
import { trpc } from "@/utils/trpc";

interface LinkItem {
  path: string;
  title: string;
}

const links: Array<LinkItem> = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/tasks",
    title: "Tasks",
  },
  {
    path: "/tasks/creation",
    title: "Create Tasks",
  },
  {
    path: "/rewards",
    title: "Rewards",
  },
  {
    path: "/rewards/creation",
    title: "Create Rewards",
  },
];

export const Header: React.FC<{ title?: string }> = ({ title }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const currentPage = links.map((link) => link.path).indexOf(usePathname());
  const ref = React.useRef<HTMLInputElement>(null);

  const sessionId = trpc.getSessionId.useQuery();

  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });

  return (
    <Box mb="6" position="fixed" top={0} w="full">
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
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        <Flex
          flexDirection="row"
          columnGap={5}
          w="full"
          justify={{ base: "center", md: "start" }}

          // ml={10}
        >
          <Link href="/">
            <Image
              priority
              src={FOX_IMG}
              alt="Fox Logo"
              boxSize="40px"
              // justifySelf={useBreakpointValue({
              //   base: "center",
              //   md: "flex-start",
              // })}
            />
          </Link>
          <Flex
            flex={{ base: 1 }}
            display={{ base: "none", md: "flex" }}
            w="full"
            columnGap="4"
            ml="6"
          >
            {links.map((link) => {
              return (
                <React.Fragment key={link.path}>
                  {/* <Link
                href={link.path}
                w={180}
                fontSize="sm"
                display="flex"
                justifyContent="center"
                alignItems="center"
                letterSpacing={0}
                margin={0}
                padding={0}
                transitionProperty="all"
                transitionDuration=".6s"
                transitionTimingFunction="ease"
                position="relative"
                _hover={{
                  _active: {
                    letterSpacing: 4,
                  },
                  textDecoration: "none",
                  letterSpacing: 4,
                  borderColor: "green.300",
                  transition: "all 280ms ease-in-out",
                  _before: {
                    backfaceVisibility: "hidden",
                    borderColor: "green.300",
                    transition: "width 350ms ease-in-out",
                    width: "100%",
                    bottom: "auto",
                    top: 0,
                    borderBottom: "2px",
                  },
                  _after: {
                    backfaceVisibility: "hidden",
                    borderColor: "green.300",
                    transition: "width 350ms ease-in-out",
                    width: "100%",
                    borderBottom: "2px",
                  },
                }}
                _before={{
                  backfaceVisibility: "hidden",
                  top: 0,
                  transition: "all 280ms ease-in-out",
                  bottom: "auto",
                  content: '" "',
                  position: "absolute",
                  display: "block",
                  margin: "0 auto",
                  w: links[currentPage].path === link.path ? "full" : 0,
                  borderBottom:
                    links[currentPage].path === link.path ? "2px" : 0,
                }}
                _after={{
                  backfaceVisibility: "hidden",
                  transition: "all 280ms ease-in-out",
                  bottom: 0,
                  content: '" "',
                  position: "absolute",
                  display: "block",
                  margin: "0 auto",
                  w: links[currentPage].path === link.path ? "full" : 0,
                  borderBottom:
                    links[currentPage].path === link.path ? "2px" : 0,
                }}
              >
                {link.title}
              </Link> */}
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
                    _hover={{
                      textDecor: "none",

                      _after: {
                        content: "''",
                        bottom: 1,
                        borderBottom: "2px",
                        w: "full",
                        backfaceVisibility: "hidden",
                        // borderColor: "green.300",
                        transition: "width 350ms ease-in-out",
                        width: "100%",
                      },
                    }}
                    _after={{
                      backfaceVisibility: "hidden",
                      transition: "all 280ms ease-in-out",
                      bottom: 1,
                      content: '" "',
                      position: "absolute",
                      display: "block",
                      margin: "0 auto",
                      w: links[currentPage].path === link.path ? "full" : 0,
                      borderBottom:
                        links[currentPage].path === link.path ? "2px" : 0,
                    }}
                  >
                    {link.title}
                  </Link>
                </React.Fragment>
              );
            })}
          </Flex>
        </Flex>
        {/* <Link
          href="/"
          w={120}
          // h={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          letterSpacing={0}
          margin={0}
          padding={0}
          transitionProperty="all"
          transitionDuration=".6s"
          transitionTimingFunction="ease"
          position="relative"
          _hover={{
            _active: {
              letterSpacing: 10,
              // paddingRight: -10,
            },
            textDecoration: "none",
            letterSpacing: 10,
            // paddingRight: -10,
            borderColor: "green.300",
            transition: "all 280ms ease-in-out",
            _before: {
              backfaceVisibility: "hidden",
              borderColor: "green.300",
              transition: "width 350ms ease-in-out",
              width: "70%",
              bottom: "auto",
              top: 0,
              borderBottom: "2px",
            },
            _after: {
              backfaceVisibility: "hidden",
              borderColor: "green.300",
              transition: "width 350ms ease-in-out",
              width: "70%",
              borderBottom: "2px",
            },
          }}
          _before={{
            backfaceVisibility: "hidden",
            top: 0,
            border: "1px solid green.400",
            transition: "all 280ms ease-in-out",
            bottom: 0,
            content: '" "',
            position: "absolute",
            display: "block",
            margin: "0 auto",
            w: 0,
          }}
          _after={{
            backfaceVisibility: "hidden",
            transition: "all 280ms ease-in-out",
            border: "1px solid green.300",
            bottom: 0,
            content: '" "',
            position: "absolute",
            display: "block",
            margin: "0 auto",
            w: 0,
          }}
        >
          TEST
        </Link> */}
        <Flex columnGap="2">
          <Button onClick={() => toggleColorMode()} w="50">
            {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>

          <Tooltip label={`Session id: ${sessionId.data}`}>
            {/* <AspectRatio maxW="400px" ratio={4 / 3}>
          
            </AspectRatio> */}
            <Image
              src={ICON_IMG}
              alt="default user icon"
              w="40px"
              // h="40px"
              // boxSize="40px"
              // objectFit="cover"
            />
          </Tooltip>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity ref={ref}>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      // bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
      // bg="teal.100"
    >
      {links.map((link) => (
        <MobileNavItem key={link.path} {...link} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ title, path }: LinkItem) => {
  const currentPage = links.map((link) => link.path).indexOf(usePathname());

  return (
    <Stack spacing={4}>
      <Flex
        py={2}
        px={2}
        as={Link}
        href={path ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
          bg: "gray.200",
        }}
        // bg={links[currentPage].path === path ? "green.100" : "gray.200"}
      >
        <Text
          fontWeight={600}
          position="relative"
          _after={{
            backfaceVisibility: "hidden",
            transition: "all 280ms ease-in-out",
            bottom: 0,
            content: '" "',
            position: "absolute",
            display: "block",
            margin: "0 auto",
            borderColor: "yellow.200",
            w: links[currentPage].path === path ? "full" : 0,
            borderBottom: links[currentPage].path === path ? "2px" : 0,
          }}
        >
          {title}
        </Text>
      </Flex>
    </Stack>
  );
};
