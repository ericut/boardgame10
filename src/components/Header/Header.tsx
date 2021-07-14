import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HStack,
  VStack,
  Flex,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { BiMenu, BiMoon, BiSun } from "react-icons/bi";

import Logo from "./Logo/bg10_logo.svg";
import LogoWhite from "./Logo/bg10_logo_white.svg";

const Header = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const MenuBGColor = useColorModeValue("gray.100", "gray.700");
  const MenuItens = () => {
    return (
      <>
        <Link href="/desafio10x10" passHref>
          <Button variant="ghost">Desafio 10x10</Button>
        </Link>
        <Link href="/termos">
          <Button variant="ghost">Termos de Uso</Button>
        </Link>
      </>
    );
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack justifyContent="" alignItems="">
              <MenuItens />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Flex
        as="header"
        m={{ md: "0 0 20px", sm: "0 0 5px" }}
        p="0 20px"
        maxW="100%"
        justifyContent="center"
        bg={MenuBGColor}
      >
        <Flex
          w={{ lg: "1300px", sm: "100%" }}
          justifyContent="space-between"
          alignItems="center"
          h={{ md: "90px", sm: "60px" }}
        >
          <Flex
            w={{ md: "200px", sm: "120px" }}
            alignItems="center"
            cursor="pointer"
          >
            <Link href="/">
              <Image
                src={colorMode === "light" ? Logo : LogoWhite}
                alt="bg10 <3"
              />
            </Link>
          </Flex>
          <Flex>
            <HStack
              alignItems="center"
              display={{ base: "none", md: "inline-flex" }}
            >
              <MenuItens />
            </HStack>
            <IconButton
              icon={colorMode === "light" ? <BiMoon /> : <BiSun />}
              aria-label="Dark/Light Mode"
              onClick={toggleColorMode}
              mx="10px"
            />
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
              fontSize="40px"
              ref={btnRef}
              onClick={onOpen}
              variant="ghost"
              icon={<BiMenu />}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
