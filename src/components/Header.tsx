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
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React from "react";
import FOX_IMG from "../img/FOX.png";

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
    title: "Create Task",
  },
  {
    path: "/rewards",
    title: "Rewards",
  },
  {
    path: "/rewards/creation",
    title: "Create Reward",
  },
];

export const Header: React.FC<{ title?: string }> = ({ title }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const pathname = usePathname();
  const currentPage = links.find((link) => link.path === pathname);
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
        bg="var(--chakra-colors-chakra-body-bg)"
        zIndex={10}
        pos="relative"
        // bg="teal.100"
      >
        {links.map((link) => (
          <MobileNavItem key={link.path} {...link} />
        ))}
      </Stack>
    );
  };

  const MobileNavItem = ({ title, path }: LinkItem) => {
    const pathname = usePathname();
    const currentPage = links.find((link) => link.path === pathname);

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
            bg: "gray.100",
            _dark: {
              bg: "gray.700",
            },
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
              w: currentPage?.path === path ? "full" : 0,
              borderBottom: currentPage?.path === path ? "2px" : 0,
            }}
          >
            {title}
          </Text>
        </Flex>
      </Stack>
    );
  };

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
          <Link
            href="/"
            position={{ base: "absolute", md: "relative" }}
            left={{ base: "50%", md: "auto" }}
            top={{ base: "30", md: "auto" }}
            transform={{
              base: "translateX(-50%) translateY(-50%)",
              md: "auto",
            }}
            transition="none"
          >
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
            })}
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
      <Collapse in={isOpen} animateOpacity ref={ref}>
        <MobileNav />
        <Box
          position="fixed"
          inset="0"
          top="60px"
          bg="rgba(0, 0, 0, 0.85)"
          zIndex="1"
          onClick={() => onClose()}
        />
      </Collapse>
    </Box>
  );
};
