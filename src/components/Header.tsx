import {
  Flex,
  Button,
  useColorMode,
  Box,
  Stack,
  Text,
  useDisclosure,
  Collapse,
  IconButton,
  useOutsideClick,
  Tooltip,
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

  const MobileNav = () => {
    return (
      <Stack
        // bg={useColorModeValue("white", "gray.800")}
        p={4}
        display={{ md: "none" }}
        bg="purple.200"
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
          onClick={() => onClose()}
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

  return (
    <Box
      mb="60px"
      as="header"
      position="fixed"
      top={0}
      left={0}
      w="full"
      zIndex={10}
    >
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
            <Image priority src={FOX_IMG} alt="Fox Logo" boxSize="40px" />
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
                        content: "''",
                        bottom: 1,
                        borderBottom: "2px",
                        w: "full",
                        backfaceVisibility: "hidden",
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
        <Flex columnGap="2">
          <Button onClick={() => toggleColorMode()} w="50">
            {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          </Button>

          <Tooltip label={`Session id: ${sessionId.data}`}>
            {/* <AspectRatio maxW="400px" ratio={4 / 3}>

            </AspectRatio> */}
            <Box>
              <Image
                src={ICON_IMG}
                alt="default user icon"
                w="40px"
                // h="40px"
                // boxSize="40px"
                // objectFit="cover"
              />
            </Box>
          </Tooltip>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity ref={ref}>
        <MobileNav />
      </Collapse>
    </Box>
  );
};
