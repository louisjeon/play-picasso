import { Flex } from "@chakra-ui/react";
import { NavBarItem } from "./NavBarItem";

export const NavBar = () => {
  return (
    <Flex w="90%" mt="3vh" justifyContent="space-around">
      <NavBarItem href="/" id={0} />
      <NavBarItem href="/feed" id={1} />
      <NavBarItem href="/stocks" id={2} />
      <NavBarItem href="/find" id={3} />
      <NavBarItem href="/draw" id={4} />
    </Flex>
  );
};
